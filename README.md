<p align="center">
  <img src="./public/Bedrock_TextRight.png" alt="Edit this page on GitHub button on bedrock.engineer" width="75%"/>
</p>

<h3 align="center">Bedrock, the open source foundation for ground investigation data, subsurface modelling and Geo-BIM.</h3>

---

## ℹ️ This is the Repository with Bedrock's Website and Documentation

📃 **Documentation:** <https://bedrock.engineer/docs>

🖥️ **Source Code:** <https://github.com/bedrock-gi/bedrock-gi>

🐍 **`bedrock-gi` on PyPI:** <https://pypi.org/project/bedrock-gi/>

🌐 **Website:** <https://bedrock.engineer/>

🔗 **LinkedIn:** <https://www.linkedin.com/company/bedrock-gi>

---

## 🌟 Highlights

### 📖 Read / write Ground Investigation (GI) data in different formats

| Data Format | Read | Write |
|-------------|------|-------|
| AGS 3       | ✅  | ❌    |
| AGS 4       | Soon | [python-ags4](https://pypi.org/project/python-AGS4/) |
| Excel       | ✅  | ✅    |
| CSV         | ✅  | ✅    |
| JSON        | ✅  | ✅    |
| GeoJSON     | ✅  | ✅    |

What do you need? [DIGGS](https://diggsml.org/)? [NADAG](https://www.ngu.no/geologisk-kartlegging/om-nadag-nasjonal-database-grunnundersokelser)? [GEF](https://publicwiki.deltares.nl/display/STREAM/Dutch+National+GEF+Standards)?  Something else?  
Let us know by creating an [issue](https://github.com/bedrock-gi/bedrock-gi/issues) or starting a [discussion](https://github.com/orgs/bedrock-gi/discussions) 💭

Also, if you have a project with publicly available GI data, please share that in a [discussion](https://github.com/orgs/bedrock-gi/discussions), such that we can create a tutorial from it 🤩

### ✅ Validate your GI data

`bedrock-gi` comes with data validation to make sure that you can combine Ground Investigation data from multiple files into a single GIS database with consistent relationships between GI locations, samples, in-situ measurements and lab tests.

This data validation mechanism (based on [`pandera`](https://pandera.readthedocs.io/en/stable/)) is easily extensible, giving you the power to add your own data validation criteria 💪

### 🗺️ Put your GI data from multiple files into a single 3D GIS database

For example, you can take GI data from 100 AGS files and combine them into a single a [GeoPackage](https://en.wikipedia.org/wiki/GeoPackage) ([like a Shapefile, but then waaay better](http://switchfromshapefile.org/)). Such a GeoPackage can then be loaded into ArcGIS, such that you can visualize your GI data in 3D:

<p align="center">
  <img src="./public/images/KaiTak_BrGI_ArcGIS.gif" alt="Edit this page on GitHub button on bedrock.engineer" width="90%"/>
</p>

### 🟦 Put your GI data into Speckle

Once you have your GI data inside [Speckle](https://speckle.systems/), it's super easy to visualize your GI data together with your civil engineering designs:

<p align="center">
  <img src="./public/images/KaiTak_BrGI_Speckle.png" alt="Kai Tak, Hong Kong, data from many sources." width="56%" />
  <img src="./public/images/BPFoundation.png" alt="Bored Pile foundation design." width="40%" />
  <a href="https://app.speckle.systems/projects/013aaf06e7/models/0fa0287ba8@dfbec71408,1cbe68ed69@d3c4a34cff,44c8d1ecae@b962e2f29d,7f9d99cae2@bbed7cf165,9535541c2b@fafe06f9c0,a739490298@e858cc8cb3,ff81bfa02b@dda7c2f981" target="_blank">Click here to go to the Kai Tak Speckle project from the left image</a>
</p>

And your GI data becomes available in all the software that [Speckle has connectors](https://app.speckle.systems/downloads) for.

### 🔓 Free and Open Source Software

Free and Open Source Software (FOSS) gives you full access to the code, which means you can customize `bedrock-gi` to integrate with other tools and fit your workflows & project needs.

As the name implies, FOSS is free to use, so you're not tied to expensive software licenses or locked into a specific software vendor ⛓️‍💥

You can give [feedback](#-feedback) and [contribute](#-contributing), such that together we together can build the tools we've always wanted and needed 🤝

## ℹ️ Overview

> ### Definition
>
> In an abstract sense, the bedrock are the main principles on which something is based. [1]
>
> In the real world, the bedrock is the hard area of rock in the ground that holds up the loose soil above. [1]
>
> In many civil engineering projects, the identification of the bedrock through digging, drilling or geophysical methods is an important task, which greatly influences (foundation) design. [2]  
>
> Sources: [[1] Bedrock | Cambridge Dictionary](https://dictionary.cambridge.org/us/dictionary/english/bedrock), [[2] Bedrock | Wikipedia](https://en.wikipedia.org/wiki/Bedrock)
