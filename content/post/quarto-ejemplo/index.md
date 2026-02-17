---
title: "Análise de Datos con Quarto e Hugo"
description: "Exemplo de artigo xerado con Quarto que Hugo pode procesar"
date: 2024-02-04
slug: quarto-ejemplo
categories:
  - Ciencia de Datos
  - Quarto
tags:
  - R
  - Quarto
  - Hugo
  - Análise de Datos
math: true
image: cover.jpg
---

Este é un exemplo dun artigo creado con **Quarto** que pode ser procesado por **Hugo**. 

## Que é Quarto?

Quarto é un sistema de publicación científica e técnica que permite crear documentos reproducibles con código, gráficos e texto.

## Análise de Datos con R

Vamos realizar unha análise simple de datos usando R:

```r
# Cargar librerías
library(ggplot2)
library(dplyr)

# Crear datos de ejemplo
set.seed(123)
datos <- data.frame(
  x = 1:100,
  y = cumsum(rnorm(100)) + 50,
  categoria = rep(c("A", "B"), each = 50)
)

# Resumo estatístico
summary(datos$y)
```

## Visualización

Agora vamos crear un gráfico:

```r
ggplot(datos, aes(x = x, y = y, color = categoria)) +
  geom_line() +
  geom_point() +
  labs(
    title = "Serie Temporal de Exemplo",
    x = "Tempo",
    y = "Valor",
    color = "Categoría"
  ) +
  theme_minimal()
```

*Nota: Os gráficos xerados por Quarto gárdanse como imaxes e pódense incluír no artigo.*

## Fórmulas Matemáticas

Quarto e Hugo soportan fórmulas matemáticas usando LaTeX. Por exemplo, a fórmula da distribución normal:

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}
$$

O inline: A media mostral calcúlase como $\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$.

## Táboas

Tamén podemos crear táboas formatadas. Aquí tes un exemplo de táboa de resumo estatístico:

| Categoría | Media | Mediana | Desviación | Mínimo | Máximo |
|-----------|-------|---------|------------|--------|--------|
| A         | 50.00 | 50.00   | 5.00       | 40.00  | 60.00  |
| B         | 50.00 | 50.00   | 5.00       | 40.00  | 60.00  |

*Nota: As táboas xeradas por Quarto convértense automaticamente a formato Markdown.*

## Código Python

Quarto tamén soporta Python:

```python
import numpy as np
import pandas as pd

# Crear datos
datos_python = pd.DataFrame({
    'x': range(1, 101),
    'y': np.cumsum(np.random.randn(100)) + 50
})

print(f"Media: {datos_python['y'].mean():.2f}")
print(f"Desviación estándar: {datos_python['y'].std():.2f}")
```

## Conclusiones

Este exemplo mostra como podes:

1. Crear artigos con código executable (R, Python, etc.)
2. Xerar gráficos e táboas automaticamente
3. Incluír fórmulas matemáticas
4. Renderizar todo nun formato que Hugo pode procesar

## Como usar este arquivo

Para renderizar o arquivo `.qmd` a Markdown que Hugo poida usar:

```bash
quarto render content/post/quarto-ejemplo/index.qmd --to markdown
```

Esto generará un archivo `index.md` actualizado que Hugo puede procesar directamente.

### Fluxo de traballo recomendado

1. **Escribe o teu contido** no arquivo `.qmd` con código executable
2. **Renderiza con Quarto** para xerar gráficos, táboas e executar código
3. **Hugo procesa** o arquivo `index.md` resultante para xerar o sitio web

### Notas importantes

- Os gráficos xerados por Quarto gárdanse na carpeta do artigo
- As fórmulas matemáticas funcionan directamente con Hugo (usa KaTeX)
- O código móstrase con resaltado de sintaxe grazas á configuración de Hugo
- Podes executar o código en Quarto e logo usar o Markdown renderizado en Hugo
