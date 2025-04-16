import numpy as np
import matplotlib.pyplot as plt
import imageio
from matplotlib.patches import Polygon
from matplotlib import rcParams
rcParams['animation.embed_limit'] = 2**128  # por si hay límites

# Configurar resolución de la figura
plt.rcParams["figure.figsize"] = (6, 6)

# --- Triángulo inicial en coordenadas homogéneas ---
triangulo = np.array([[0, 1, 0.5, 0],
                      [0, 0, 1,   0],
                      [1, 1, 1,   1]])

# --- Transformaciones ---
def get_transformacion(t, total_frames):
    """Calcula la matriz de transformación compuesta para el tiempo t"""
    # Interpolación lineal
    dx = 2 * t / total_frames         # Traslación en x (0 → 2)
    dy = 1 * t / total_frames         # Traslación en y (0 → 1)
    ang = 360 * t / total_frames      # Rotación (0° → 360°)
    sx = 1 + t / total_frames         # Escala en x (1 → 2)
    sy = 1 - 0.5 * (t / total_frames) # Escala en y (1 → 0.5)

    # Matrices
    T = np.array([[1, 0, dx],
                  [0, 1, dy],
                  [0, 0, 1]])
    rad = np.radians(ang)
    R = np.array([[np.cos(rad), -np.sin(rad), 0],
                  [np.sin(rad),  np.cos(rad), 0],
                  [0,            0,           1]])
    S = np.array([[sx, 0,  0],
                  [0,  sy, 0],
                  [0,  0,  1]])

    # Matriz compuesta
    M = T @ R @ S  # Orden: escalar -> rotar -> trasladar
    return M

# --- Crear frames para animación ---
frames = []
total_frames = 40

for t in range(total_frames):
    M = get_transformacion(t, total_frames)
    tri_transformado = M @ triangulo

    # Crear figura
    fig, ax = plt.subplots()
    ax.plot(tri_transformado[0], tri_transformado[1], marker='*', color='black')
    ax.fill(tri_transformado[0], tri_transformado[1], color='skyblue', alpha=0.4)
    ax.set_xlim(-2, 4)
    ax.set_ylim(-2, 4)
    ax.set_aspect('equal')
    ax.grid(True)

    # Mostrar la matriz opcionalmente
    texto_matriz = f"Matriz frame {t}:\n{np.round(M, 2)}"
    ax.text(-1.5, 3, texto_matriz, fontsize=8, verticalalignment='top')

    # Guardar frame temporal
    fname = f'frame_{t}.png'
    plt.savefig(fname)
    frames.append(imageio.v2.imread(fname))
    plt.close()

# --- Guardar GIF ---
imageio.mimsave('transformacion_triangulo.gif', frames, duration=0.1)

# --- Mostrar GIF en Colab ---
from IPython.display import Image
Image(open('transformacion_triangulo.gif','rb').read())

