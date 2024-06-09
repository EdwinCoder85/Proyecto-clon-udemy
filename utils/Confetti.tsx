"use client"

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Confetti = () => {
  useEffect(() => {
    // Configuración de los cañones de confeti
    const config = {
      angle: 90,
      spread: 360,
      startVelocity: 40,
      elementCount: 70,
      dragFriction: 0.12,
      duration: 3000,
      stagger: 3,
      width: '10px',
      height: '10px',
      colors: ['#ff0000', '#00ff00', '#0000ff', '#FFEA00', '#839192'], // Puedes personalizar los colores
    };

    // Disparar confeti
    confetti(config);
  }, []);

  return null; // No renderizamos nada en el DOM, ya que canvas-confetti manipula el canvas directamente
};

export default Confetti;