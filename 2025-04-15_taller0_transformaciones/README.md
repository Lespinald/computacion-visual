# Animaciones con Transformaciones 2D y 3D

Este repositorio contiene tres implementaciones que demuestran el uso de **transformaciones geométricas animadas** en distintos entornos: **Processing, React Three Fiber (3D con WebGL), y Python (2D con matplotlib y imageio)**.

---

## 🧊 1. Processing (2D y 3D)

### `processing_3d.pde`
- Utiliza `P3D` para crear un cubo 3D (`box()`).
- El cubo rota sobre sus ejes, se escala y se traslada siguiendo una trayectoria en forma de símbolo infinito ("∞").
- Dibuja un cubo que rota, se traslada en un patrón de infinito y cambia de tamaño dinámicamente.
- Usa `translate()`, `rotate()`, `scale()` y `sin()` en función del tiempo (`frameCount`).
- Aislamiento de transformaciones con `pushMatrix()` y `popMatrix()`.
- Transformaciones dinámicas basadas en `frameCount` y funciones trigonométricas.

## 🌐 2. React Three Fiber (Three.js + React)

### `App.jsx`
- Escena WebGL creada con `@react-three/fiber` y `@react-three/drei`.
- Renderiza una esfera 3D animada que:
  - Se traslada en trayectoria circular.
  - Rota continuamente en `x` e `y`.
  - Se escala con `Math.sin(clock.elapsedTime)` para dar efecto pulsante.
- Incluye `OrbitControls` para navegación 3D con el mouse.

---

## 🐍 3. Python (Colab / Jupyter Notebook)

### `animated_transformations.py`
- Usa `matplotlib`, `numpy`, y `imageio` para crear animaciones 2D.
- Dibuja un triangulo.
- Aplica **traslación**, **rotación**, y **escala** mediante matrices de transformación.
- Genera una animación interpolada en el tiempo usando bucles.
- Exporta el resultado como GIF animado.

---

## EXTRA. Exposición semana 2

### `Simuladores quirúrgicos con realidad virtual`
- El aporte de la exposición fueron los ejemplos de simulaciones con inteligencia artificial en la actualidad, la descripción de estos ejemplos y los beneficios que trae la simulación quirúrgica en la educación médica

---
