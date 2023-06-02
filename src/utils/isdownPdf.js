export const downloadPagePdf = (ctx) => {
    return (ctx?.router.state?.query?.download == 'pdf') || (ctx?.router?.query?.download == 'pdf');
}