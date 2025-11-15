const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('⚠️  GEMINI_API_KEY no configurada. El servicio de IA usará fallback.');
      this.genAI = null;
    } else {
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
  }

  /**
   * Genera especificaciones técnicas basadas en las necesidades del usuario
   * @param {Object} userNeeds - Necesidades del usuario
   * @returns {Promise<Object>} Especificaciones técnicas
   */
  async generateTechSpecs(userNeeds) {
    // Si no hay API key, usar lógica de fallback
    if (!this.genAI) {
      return this.getFallbackSpecs(userNeeds);
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-pro',
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
        }
      });

      const prompt = this.buildPrompt(userNeeds);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Intentar parsear la respuesta JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const specs = JSON.parse(jsonMatch[0]);
        return this.validateSpecs(specs);
      } else {
        console.warn('La IA no devolvió JSON válido, usando fallback');
        return this.getFallbackSpecs(userNeeds);
      }
    } catch (error) {
      console.error('Error en Gemini AI:', error.message);
      return this.getFallbackSpecs(userNeeds);
    }
  }

  /**
   * Construye el prompt para Gemini AI
   */
  buildPrompt(needs) {
    return `Eres un experto en hardware de computadores. Analiza las siguientes necesidades del usuario y devuelve SOLO un objeto JSON con las especificaciones técnicas recomendadas.

Necesidades del usuario:
- Uso Principal: ${needs.use}
- Nivel de Rendimiento: ${needs.performance}
- Programas: ${needs.programs || 'No especificados'}
- Presupuesto Máximo: $${needs.budget} CLP
- Tipo: ${needs.portability}

Devuelve ÚNICAMENTE un objeto JSON con esta estructura exacta (sin texto adicional):
{
  "min_cpu_score": [número del 1-10],
  "min_gpu_score": [número del 1-10],
  "min_ram_gb": [8, 16, o 32],
  "reasoning": "[Explicación breve en español de por qué elegiste estos valores]"
}

Consideraciones:
- Gaming/Diseño requieren GPU alta (7-10) y RAM 16GB+
- Programación necesita CPU alta (7-10) y RAM 16GB+
- Oficina/Estudio pueden funcionar con specs más bajas
- "Alto" rendimiento = scores 7-10
- "Intermedio" = scores 4-7
- "Básico" = scores 1-3`;
  }

  /**
   * Valida y corrige las especificaciones recibidas
   */
  validateSpecs(specs) {
    return {
      min_cpu_score: Math.max(1, Math.min(10, specs.min_cpu_score || 5)),
      min_gpu_score: Math.max(1, Math.min(10, specs.min_gpu_score || 3)),
      min_ram_gb: Math.max(8, specs.min_ram_gb || 8),
      reasoning: specs.reasoning || 'Especificaciones basadas en tu perfil de uso.'
    };
  }

  /**
   * Lógica de fallback cuando la IA no está disponible
   */
  getFallbackSpecs(needs) {
    let min_cpu_score = 1;
    let min_gpu_score = 1;
    let min_ram_gb = 8;
    let reasoning = 'Especificaciones calculadas por lógica de respaldo (API de IA no disponible).';

    // Ajustar por nivel de rendimiento
    if (needs.performance === 'intermedio') {
      min_cpu_score = 4;
      min_gpu_score = 3;
    } else if (needs.performance === 'alto') {
      min_cpu_score = 7;
      min_gpu_score = 6;
      min_ram_gb = 16;
    }

    // Ajustar por tipo de uso
    if (needs.use === 'diseno' || needs.use === 'gaming') {
      min_cpu_score = Math.max(min_cpu_score, 5);
      min_gpu_score = Math.max(min_gpu_score, 5);
      min_ram_gb = Math.max(min_ram_gb, 16);
      if (needs.performance === 'alto') {
        min_gpu_score = 8;
      }
      reasoning = 'Para diseño y gaming necesitas una GPU potente y buena RAM.';
    } else if (needs.use === 'programacion') {
      min_cpu_score = Math.max(min_cpu_score, 5);
      min_ram_gb = Math.max(min_ram_gb, 16);
      reasoning = 'Para programación necesitas un buen procesador y suficiente RAM.';
    } else if (needs.use === 'oficina' || needs.use === 'estudio') {
      reasoning = 'Para tareas de oficina, especificaciones básicas son suficientes.';
    }

    return {
      min_cpu_score,
      min_gpu_score,
      min_ram_gb,
      reasoning
    };
  }
}

module.exports = new GeminiService();
