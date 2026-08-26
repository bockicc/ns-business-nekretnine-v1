import { ArrowLeft, ArrowRight, CheckCircle2, PartyPopper } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { useSubmissionWizard } from '@/hooks/useSubmissionWizard';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { StepIndicator } from './StepIndicator';
import { StepBasicInfo } from './StepBasicInfo';
import { StepPhotosDescription } from './StepPhotosDescription';
import { StepContactPayment } from './StepContactPayment';

export function SubmissionWizard() {
  const wizard = useSubmissionWizard();
  const {
    draft,
    stepIndex,
    currentStep,
    stepErrors,
    status,
    result,
    isFirstStep,
    isLastStep,
    patchBasicInfo,
    patchPhotosDescription,
    patchContactPayment,
    goToStep,
    next,
    back,
    submit,
    reset,
  } = wizard;

  if (status === 'success' && result) {
    return (
      <div role="status" className="rounded-lg border border-status-sale-border bg-status-sale-bg px-6 py-12 text-center">
        <PartyPopper aria-hidden="true" className="mx-auto size-10 text-gold-600" />
        <h2 className="mt-4 font-display text-2xl font-medium text-primary-900">
          Zahtev za objavu je primljen
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-700">
          Vaš oglas je u pregledu. Očekivani rok odobrenja: {result.reviewWindowHours}. Nakon
          odobrenja i uplate od {result.fee.amount.toLocaleString('sr-RS')} RSD, oglas se objavljuje
          na {result.fee.periodDays} dana.
        </p>
        <p className="mt-5 inline-flex rounded-full border border-status-sale-border bg-white px-4 py-2 text-sm font-semibold text-primary-900">
          Broj prijave: <span className="ml-2 font-display">{result.referenceCode}</span>
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={reset}>
            Postavite još jedan oglas
          </Button>
          <Button onClick={() => window.open(siteConfig.contact.whatsappHref, '_blank', 'noreferrer')}>
            Kontaktirajte nas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-card md:p-8">
      <StepIndicator stepIndex={stepIndex} />

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (isLastStep) void submit();
          else next();
        }}
        className="mt-8"
      >
        {currentStep?.id === 'basic-info' ? (
          <StepBasicInfo basicInfo={draft.basicInfo} errors={stepErrors['basic-info'] ?? {}} onPatch={patchBasicInfo} />
        ) : null}
        {currentStep?.id === 'photos-description' ? (
          <StepPhotosDescription
            photosDescription={draft.photosDescription}
            errors={stepErrors['photos-description'] ?? {}}
            onPatch={patchPhotosDescription}
          />
        ) : null}
        {currentStep?.id === 'contact-payment' ? (
          <StepContactPayment contactPayment={draft.contactPayment} errors={stepErrors['contact-payment'] ?? {}} onPatch={patchContactPayment} />
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-neutral-100 pt-6">
          {isFirstStep ? (
            <span aria-hidden="true" />
          ) : (
            <Button variant="outline" onClick={back}>
              <ArrowLeft className="size-4" aria-hidden="true" />
              Nazad
            </Button>
          )}
          <Button type="submit" size="lg" disabled={status === 'submitting'}>
            {status === 'submitting' ? (
              <>
                <Spinner className="size-4 animate-spin text-white" />
                Šaljemo…
              </>
            ) : isLastStep ? (
              <>
                <CheckCircle2 className="size-4" aria-hidden="true" />
                Pošaljite na pregled
              </>
            ) : (
              <>
                Dalje
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>

        {!isFirstStep && !isLastStep ? (
          <button
            type="button"
            onClick={() => goToStep(0)}
            className="mt-4 text-xs font-semibold text-neutral-500 underline-offset-2 transition-colors hover:text-primary-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            Vrati se na prvi korak
          </button>
        ) : null}
      </form>
    </div>
  );
}
