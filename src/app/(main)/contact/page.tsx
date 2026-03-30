'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/hooks/use-language';
import { sendEmail } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useEffect, useRef } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useLanguage();

  return (
    <Button type="submit" className="w-full font-body rounded-full" size="lg" disabled={pending}>
      {pending ? t('contactSendingButton') : t('contactSendButton')}
    </Button>
  );
}

const ContactPage = () => {
  const { t } = useLanguage();
  const initialState = { message: '', errors: null, success: false };
  const [state, dispatch] = useFormState(sendEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <main className="flex-1">
      <section id="contact" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto flex justify-center px-4 md:px-6">
          <div className="w-full max-w-lg">
            <div className="text-center mb-8">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">{t('contactTitle')}</h1>
              <div className="text-muted-foreground mt-2">
                <p>{t('contactSubtitle')}</p>
                <a href={`mailto:${t('contactEmail')}`} className="text-primary hover:underline">{t('contactEmail')}</a>
              </div>
            </div>
            <form ref={formRef} action={dispatch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('contactNamePlaceholder')}</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder={t('contactNamePlaceholder')} 
                  required 
                  className='bg-secondary'
                />
                 {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name.join(', ')}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('contactEmailPlaceholder')}</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder={t('contactEmailPlaceholder')} 
                  required 
                  className='bg-secondary'
                />
                {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email.join(', ')}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t('contactMessagePlaceholder')}</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder={t('contactMessagePlaceholder')} 
                  required 
                  minLength={10} 
                  className='bg-secondary'
                />
                 {state.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message.join(', ')}</p>}
              </div>
              <SubmitButton />
            </form>

            {state.message && !state.success && (
              <div className="mt-4">
                <Alert variant='destructive'>
                  <AlertTitle>{t('formErrorTitle')}</AlertTitle>
                  <AlertDescription>
                    {state.message}
                  </AlertDescription>
                </Alert>
              </div>
            )}
             {state.success && (
              <div className="mt-4">
                <Alert>
                  <AlertTitle>{t('formSuccessTitle')}</AlertTitle>
                  <AlertDescription>
                    {t('formSuccessMessage')}
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;

    