
let idTimeout = null;
export const deferredSaving = async (
   idCv,
   functionSave = () => { }
) => {
   if (!!idCv) {
      if (idTimeout) {
         clearTimeout(idTimeout);
      }

      idTimeout = setTimeout(() => {
         functionSave();
         clearTimeout(idTimeout);
      }, 1000);
   }
}