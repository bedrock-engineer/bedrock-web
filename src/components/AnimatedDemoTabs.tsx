// https://reactspectrum.blob.core.windows.net/reactspectrum/6c498f1292e1a683427a2fade6b7f06d77ea9a28/docs/react-aria/examples/swipeable-tabs.html
import {
  Collection,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "react-aria-components";
import {
  animate,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "../styles/animated-tabs.css";

import kaiTakSpeckle from "../assets/KaiTak_BrGI_Speckle.png";
import arcGIS from "../assets/KaiTak_BrGI_ArcGIS.webp";

interface TabData {
  id: string;
  label: string;
  content: React.ReactNode;
}

const homepageTabs: TabData[] = [
  {
    id: "interactive-visualization",
    label: "Interactive Visualization",
    content: (
      <div className="tab-content-grid">
        <div>
          <h3 className="tab-panel-title">
            View and share your Ground Investigation data in the browser
          </h3>
          <p className="text-lg">
            Bridge the gap between specialized GI data formats and the wider
            world of geospatial tools and standards.
          </p>
          <p className="text-lg">
            Explore boreholes, test results, and geology directly in your
            browser, no specialist software required.
          </p>
        </div>

        <figure>
          <iframe
            src="https://bedrock.engineer/hk-kaitak/"
            height={400}
            style={{ width: "100%", maxWidth: "700px", borderRadius: "4px" }}
          />

          <figcaption>
            GI data in Kai Tak, Hong Kong.{" "}
            <a className="link" href="https://bedrock.engineer/hk-kaitak">
              Explore for yourself.
            </a>
          </figcaption>
        </figure>
      </div>
    ),
  },
  {
    id: "geospatial",
    label: "Geospatial Data Integration",

    content: (
      <div className="tab-content-grid">
        <div>
          <h3 className="tab-panel-title">
            Unlock the geospatial ecosystem for subsurface data
          </h3>

          <p className="text-lg">
            Access GI data in GIS software, Python, and modern geospatial
            workflows. Analyze, visualize, and automate using the tools data
            scientists and GIS professionals already know.
            {/* Move beyond specialist software limitations. */}
          </p>
        </div>

        <figure>
          <img src={arcGIS.src} alt="Subsurface data visualized in ArcGIS" />
          <figcaption>
            Kai Tak, Hong Kong 3D GI data visualization in ArcGIS.
          </figcaption>
        </figure>
      </div>
    ),
  },
  {
    id: "cad-bim",
    label: "CAD & BIM Integration",

    content: (
      <div className="tab-content-grid">
        <div>
          <h3 className="tab-panel-title">
            Connect subsurface data with structural and building models
          </h3>

          <p className="text-lg">
            Break down silos with geospatial GI data—view geotechnical and
            structural models together, enabling seamless collaboration across
            disciplines in Speckle, Rhino, and Civil3D
          </p>
        </div>

        <figure>
          <img
            src={kaiTakSpeckle.src}
            alt="Interactive 3D visualization of subsurface data in Speckle"
          />
          <figcaption>
            Kai Tak, Hong Kong 3D GI data visualization in Speckle.
          </figcaption>
        </figure>
      </div>
    ),
  },
];

interface AnimatedDemoTabsProps {
  tabs?: TabData[];
}

export function AnimatedDemoTabs({
  tabs = homepageTabs,
}: AnimatedDemoTabsProps) {
  const [selectedKey, setSelectedKey] = useState(tabs[0].id);

  const tabListRef = useRef<HTMLDivElement>(null);
  const tabPanelsRef = useRef<HTMLDivElement>(null);

  // Track the scroll position of the tab panel container.
  let { scrollXProgress } = useScroll({
    container: tabPanelsRef,
  });

  // Find all the tab elements so we can use their dimensions.
  const [tabElements, setTabElements] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (tabElements.length === 0 && tabListRef.current) {
      let tabs = Array.from(
        tabListRef.current.querySelectorAll("[role=tab]"),
      ) as HTMLElement[];
      setTabElements(tabs);
    }
  }, [tabElements]);

  // This function determines which tab should be selected
  // based on the scroll position.
  let getIndex = (x: number) => {
    if (!tabListRef.current) return 0;
    let elements = Array.from(
      tabListRef.current.querySelectorAll("[role=tab]"),
    ) as HTMLElement[];
    return Math.max(0, Math.floor((elements.length - 1) * x));
  };

  // This function transforms the scroll position into the X position
  // or width of the selected tab indicator.
  let transform = (x: number, property: "offsetLeft" | "offsetWidth") => {
    if (!tabListRef.current) return 0;

    // Query elements fresh each time to get current dimensions
    let elements = Array.from(
      tabListRef.current.querySelectorAll("[role=tab]"),
    ) as HTMLElement[];
    if (!elements.length) return 0;

    // Find the tab index for the scroll X position.
    let index = Math.max(0, Math.floor((elements.length - 1) * x));

    // Get the difference between this tab and the next one.
    let difference =
      index < elements.length - 1
        ? elements[index + 1][property] - elements[index][property]
        : elements[index].offsetWidth;

    // Get the percentage between tabs.
    // This is the difference between the integer index and fractional one.
    let percent = (elements.length - 1) * x - index;

    // Linearly interpolate to calculate the position of the selection indicator.
    let value = elements[index][property] + difference * percent;

    // iOS scrolls weird when translateX is 0 for some reason. 🤷‍♂️
    return value || 0.1;
  };

  let x = useTransform(scrollXProgress, (x) => transform(x, "offsetLeft"));
  let width = useTransform(scrollXProgress, (x) => transform(x, "offsetWidth"));

  // When the window resizes, update the indicator position
  useEffect(() => {
    const handleResize = () => {
      const currentProgress = scrollXProgress.get();
      x.set(transform(currentProgress, "offsetLeft"));
      width.set(transform(currentProgress, "offsetWidth"));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollXProgress, x, width]);

  // When the user scrolls, update the selected key
  // so that the correct tab panel becomes interactive.
  useMotionValueEvent(scrollXProgress, "change", (x) => {
    if (animationRef.current || !tabElements.length) return;
    setSelectedKey(tabs[getIndex(x)].id);
  });

  // When the user clicks on a tab perform an animation of
  // the scroll position to the newly selected tab panel.
  let animationRef = useRef<any>(null);
  let onSelectionChange = (selectedKey: string | number) => {
    setSelectedKey(selectedKey as string);

    // If the scroll position is already moving but we aren't animating
    // then the key changed as a result of a user scrolling. Ignore.
    if (scrollXProgress.getVelocity() && !animationRef.current) {
      return;
    }

    let tabPanel = tabPanelsRef.current;
    if (!tabPanel) return;

    let index = tabs.findIndex((tab) => tab.id === selectedKey);
    animationRef.current?.stop();
    animationRef.current = animate(
      tabPanel.scrollLeft,
      tabPanel.scrollWidth * (index / tabs.length),
      {
        type: "spring",
        bounce: 0.2,
        duration: 0.6,
        onUpdate: (v) => {
          tabPanel.scrollLeft = v;
        },
        onPlay: () => {
          // Disable scroll snap while the animation is going or weird things happen.
          tabPanel.style.scrollSnapType = "none";
        },
        onComplete: () => {
          tabPanel.style.scrollSnapType = "";
          animationRef.current = null;
        },
      },
    );
  };

  return (
    <Tabs
      className="animated-tabs"
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
    >
      <div className="tabs-header">
        <TabList ref={tabListRef} className="tabs-list" items={tabs}>
          {(tab: TabData) => (
            <Tab className="tab-button">
              {({ isSelected, isFocusVisible }) => (
                <>
                  {tab.label}
                  {isFocusVisible && isSelected && (
                    // Focus ring.
                    <motion.span
                      className="tab-focus-ring"
                      style={{ x, width }}
                    />
                  )}
                </>
              )}
            </Tab>
          )}
        </TabList>
        {/* Selection indicator. */}
        <motion.span className="tab-indicator" style={{ x, width }} />
      </div>

      <div ref={tabPanelsRef} className="tab-panels-container">
        <Collection items={tabs}>
          {(tab: TabData) => (
            <TabPanel shouldForceMount className="tab-panel-animated">
              <div className="tab-panel-content">{tab.content}</div>
            </TabPanel>
          )}
        </Collection>
      </div>
    </Tabs>
  );
}
