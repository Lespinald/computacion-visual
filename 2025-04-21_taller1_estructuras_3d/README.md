# 🧪 Nombre del Taller

## 📅 Fecha
`2025-04-21` – Fecha de entrega o realización

---

## 🎯 Objetivo del Taller

Este repositorio contiene tres implementaciones que demuestran el uso de **estructuras 3d** en distintos entornos.

---

## 🧠 Conceptos Aprendidos

Principales conceptos aplicados:

- [ ] Transformaciones geométricas (escala, rotación, traslación)
- [ ] Segmentación de imágenes
- [ ] Shaders y efectos visuales
- [ ] Entrenamiento de modelos IA
- [ ] Comunicación por gestos o voz
- [ ] Otro: _______________________

---

## 🔧 Herramientas y Entornos

Entornos usados:

- Python (`opencv-python`, `torch`, `mediapipe`, `diffusers`, etc.)
- Unity (versión LTS, XR Toolkit, Shader Graph)
- Three.js / React Three Fiber
- Jupyter / Google Colab

---

## 📁 Estructura del Proyecto

```
2025-04-21_nombre_taller/
├── entorno/               # python/, unity/, threejs/, colab/
├── datos/                 # imágenes, audio, modelos, video
├── resultados/            # capturas, métricas, gifs
├── README.md
```

---

## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas
1. Preparación de datos o escena.
2. Aplicación de modelo o algoritmo.
3. Visualización o interacción.
4. Guardado de resultados.

### 🔹 Código relevante

Incluye un fragmento que resuma el corazón del taller:

```python
# Segmentación semántica con DeepLab
output = model(input_tensor)['out']
prediction = output.argmax(1).squeeze().cpu().numpy()
```

---

## 📊 Resultados Visuales

### 📌 Este taller **requiere explícitamente un GIF animado**:

> ✅ Si tu taller lo indica, debes incluir **al menos un GIF** mostrando la ejecución o interacción.

- Usa `Peek`, `ScreenToGif`, `OBS`, o desde Python (`imageio`) para generar el GIF.
- **El nombre del GIF debe ser descriptivo del punto que estás presentando.**
- Ejemplo correcto:  
  `deteccion_colores_rojo_verde_torres.gif`  
  `movimiento_robot_esquiva_obstaculos_gomez.gif`  
  `shader_gradiente_temporal_lopez.gif`

🧭 [Ver guía para crear GIFs](./guia_generar_gif.md)

---

## 🧩 Prompts Usados

Prompts utilizados:

```text
"Create a photorealistic image of a robot painting a mural using Stable Diffusion"
"Segment a car and a person using SAM at point (200, 300)"
```
---

## 💬 Reflexión Final

Responde en 2-3 párrafos:

- ¿Qué aprendiste o reforzaste con este taller?
- ¿Qué parte fue más compleja o interesante?
- ¿Qué mejorarías o qué aplicarías en futuros proyectos?

---

## 👥 Contribuciones Grupales (si aplica)

Describe exactamente lo que hiciste tú:

```markdown
- Programé el detector de postura en MediaPipe
- Generé los GIFs y documentación
- Integré el control de voz con visualización en Unity
```

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-04-28_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---
