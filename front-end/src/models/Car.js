import { z } from 'zod'

// Instruçoes do ano de fabricação
const currentYear = new Date().getFullYear()
const minYear_manufacture = 1960
const maxYear_manufacture = new Date()
maxYear_manufacture.setFullYear(maxYear_manufacture.getFullYear() )



// instruções de data de venda
const minSellingDate = new Date ('2020-03-20')
const maxSellingDate = new Date () // data de hoje

// Cores conforme instruções
const colors = [
  'Amarelo', 'Azul', 'Branco', 'Cinza',
  'Dourado', 'Laranja', 'Marrom', 'Marrom',
  'Preto', 'Rosa', 'Roxo', 'Verde', 'Vermelho'
]

//instrucoes dos dados do carro
const Car = z.object({
  brand: z.string()
    .trim()
    .min(1, { message: 'A marca deve ter, no mínimo, 1 caractere.' })
    .max(25, { message: 'A marca deve ter, no máximo, 25 caracteres.' }),

  model: z.string()
    .trim()
    .min(1, { message: 'O modelo deve ter, no mínimo, 1 caractere.' })
    .max(25, { message: 'O modelo deve ter, no máximo, 25 caracteres.' }),

  color: z.enum(colors, { message: 'Cor inválida.' }),

  year_manufacture: z.number()
    .int({ message: 'O ano de fabricação deve ser um número inteiro.' })
    .min(minYear_manufacture, { message: `O ano de fabricação não pode ser anterior a ${minYear_manufacture}.` })
    .max(currentYear, { message: `O ano de fabricação não pode ser maior que ${currentYear}).` }),

  imported: z.boolean(),

  plates: z.string()
    .length(8, {message: 'Placa deve ter exatamente 8 caracteres.'}),

    selling_date: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
    }, z.date()
        .min(minSellingDate, { message: `Data de venda não pode ser anterior a 20/03/2020.` })
        .max(maxSellingDate, { message: 'Data de venda não pode ser posterior a data atual.' })

        .optional()

        .nullable()

  ),

    selling_price: z.number()
    .min(1000, {message: 'Preço de venda deve ser no minimo R$ 5.000,00.'})
    .max(5000000, {message:'Preço de venda deve ser no máximo R$ 5.000.000,00.'})

      .optional()

     })
export default Car