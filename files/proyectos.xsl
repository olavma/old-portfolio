<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="yes" />
    <xsl:template match="/">
        <html lang="es">

            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="main.css" />
                <link rel="stylesheet" href="proyectos.css" />
                <title>Proyectos</title>
            </head>
            <body>
                <nav>
                    <ul>
                        <li>
                            <a href="./index.html">Index</a>
                        </li>
                        <li>
                            <a href="./curriculum_vitae.html">CV</a>
                        </li>
                        <li>
                            <a href="./proyectos.html">Proyectos</a>
                        </li>
                    </ul>
                </nav>
                <section>
                    <h3>PROYECTOS</h3>
                    <xsl:apply-templates match="Proyectos" />
                </section>
                <footer>
                    <div>
                        <a href="https://www.linkedin.com/in/olav-martos-ace%C3%B1a-3a50b9254/">
                            <img class="footer-logos-rs" src="src/linkedin.png" alt="Linkedin" />
                        </a>
                        <a href="https://github.com/olavma">
                            <img class="footer-logos-rs" src="src/github.png" alt="Github" />
                        </a>
                    </div>
                    <address>Formas de contactar: olavma2004@gmail.com <br/>
olav.martos.7e4@itb.cat</address>
                    <p>Copyright © 2022-2023</p>
                </footer>
            </body>

        </html>
    </xsl:template>


    <xsl:template match="Proyectos">
        <xsl:for-each select="Proyecto">
            <article class="project">
                <h4 class="nameProject">
                    <xsl:value-of select="Nombre" />
                </h4>
                <figure class="portada">
                    <img><xsl:attribute name="src"><xsl:value-of select="InfoGeneral/Foto"></xsl:value-of></xsl:attribute></img>
                </figure>
                <div>
                    <h5>De que se trata</h5>
                    <p class="sinopsis">
                        <xsl:value-of select="InfoGeneral/Descripcion"></xsl:value-of>
                    </p>
                </div>
            
            <div class="language">
                <h4>Idiomas disponibles</h4>
                <h5>
                    <span>
                        <xsl:value-of select="InfoGeneral/Idiomas" />
                    </span>
                </h5>
            </div>
            <a class="btn3" target="_blank">
                <xsl:attribute name="href"><xsl:value-of select="Enlace"></xsl:value-of></xsl:attribute>
            más info</a>
            </article>
    </xsl:for-each>
</xsl:template>
</xsl:stylesheet>