import React from 'react'
import {z} from 'zod'

const GroupedBy = ["Median ", "La somme", "...", "..."] as const; // les criteres de regroupement
const xData = [""] as const 
const yData = [""] as const
const Data = [""] as const 
// schema de Line/bar car ils ont à peu prés les meme options
const LineSchema = z.object({
    title: z.string().max(30),
      X: z.enum(xData),
      Y: z.enum(yData),
      Grouped : z.enum(GroupedBy),
    })

// le reste des options je crois qu'on les prédifinit (default) 

const Pieschema = z.object({
    title: z.string().max(30),
    data: z.enum(Data) ,
    GroupedBy: z.enum(GroupedBy),

})