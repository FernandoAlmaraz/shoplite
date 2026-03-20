# ShopLite 🛒

**ShopLite** es una demostración de comercio electrónico moderna, rápida y visualmente impactante construida con **Angular 19**. Destaca por su diseño "Liquid Glass" y una experiencia de usuario fluida mediante animaciones avanzadas.

---

## ✨ Características Principales

- **Diseño Liquid Glass**: Una interfaz premium con efectos de desenfoque (backdrop-filter), gradientes suaves y tipografía moderna.
- **Animaciones Fluidas**:
  - **Fly-to-Cart**: Los productos "vuelan" hacia el carrito al ser añadidos, proporcionando feedback visual instantáneo.
  - **Staggered Removal**: Animaciones en cascada al vaciar el carrito para una experiencia más orgánica.
  - **Micro-interacciones**: Efectos de vibración en botones y transiciones suaves entre páginas.
- **Arquitectura Modular**: Componentes desacoplados con lógica, estilos y plantillas en archivos separados conforme a las mejores prácticas de Angular.
- **Estado con Signals**: Uso de Angular Signals para una gestión de estado reactiva y eficiente en el carrito y servicios.
- **Responsive Design**: Totalmente optimizado para dispositivos móviles y escritorio.

---

## 🛠️ Stack Tecnológico

- **Framework**: [Angular 19](https://angular.io/) (Standalone Components, Signals).
- **Estilos**: CSS3 nativo con variables personalizadas y efectos Glassmorphism.
- **Animaciones**: [@angular/animations](https://angular.io/guide/animations).
- **Despliegue**: GitHub Actions + GitHub Pages.

---

## 📂 Estructura del Proyecto

El proyecto está organizado para facilitar el mantenimiento y la escalabilidad:

```text
shoplite/
├── shoplite-frontend/       # Código fuente de Angular
│   ├── src/app/
│   │   ├── components/      # Componentes (Home, Products, Cart, etc.)
│   │   ├── services/        # Lógica centralizada (UiService, CartService)
│   │   └── models/          # Interfaces y modelos de datos
├── .github/workflows/       # Configuración de CI/CD (Deploy automático)
└── README.md                # Esta guía
```

---

## 🚀 Instalación y Ejecución

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/FernandoAlmaraz/shoplite.git
   cd shoplite
   ```

2. **Instalar dependencias**:
   ```bash
   cd shoplite-frontend
   npm install
   ```

3. **Ejecutar en modo desarrollo**:
   ```bash
   npm start
   ```
   Abre [http://localhost:4200](http://localhost:4200) para ver la aplicación en acción.

---

## 📦 Despliegue (CI/CD)

Este proyecto utiliza **GitHub Actions** para el despliegue automático.
- Cada `push` a la rama `main` dispara un workflow que construye la aplicación y la publica en **GitHub Pages**.
- Se ha configurado para evitar conflictos de sincronización de Git mediante el uso del deploy nativo de Actions.

---

## 👨‍💻 Autor
Desarrollado con pasión para demostrar las capacidades modernas de Angular y el diseño web contemporáneo.
