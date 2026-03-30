'use server';

import { z } from 'zod';
import { Resend } from 'resend';

type FormState = {
  message: string;
  errors: {
    name?: string[];
    email?: string[];
    message?: string[];
  } | null;
  success: boolean;
};

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères.' }),
  email: z.string().email({ message: "L'adresse e-mail n'est pas valide." }),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères.' }),
});

export async function sendEmail(prevState: FormState, formData: FormData): Promise<FormState> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Erreur de validation. Veuillez vérifier les champs.',
      success: false,
    };
  }
  
  const { name, email, message } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Contact Portfolio <onboarding@resend.dev>',
      to: ['emmanuel.iung@gmail.com'],
      reply_to: email,
      subject: `Nouveau message de ${name} depuis votre portfolio`,
      html: `
        <h1>Nouveau message de contact</h1>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { 
        errors: null,
        message: `Erreur lors de l'envoi de l'e-mail : ${error.message}`,
        success: false, 
      };
    }

    return { 
      errors: null,
      message: 'Message envoyé avec succès !',
      success: true,
    };

  } catch (error: unknown) {
    console.error('Unexpected Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue.';
    return {
      errors: null,
      message: `Erreur du serveur : ${errorMessage}`,
      success: false,
    };
  }
}
