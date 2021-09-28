import { LoadingController, ModalController } from "@ionic/angular";
import { WordsService } from "../words.service";

export function openAddWordModal(modalCtrl: ModalController, loadingCtrl: LoadingController,
                          wordsService: WordsService, componentTypeAndInput,
                          method: string, role: string = 'confirm'){
  modalCtrl.create(componentTypeAndInput).then(modalEl =>{
    modalEl.present();
    return modalEl.onDidDismiss();
  })
  .then( resultData => {
    if(resultData.role === role){
      loadingCtrl
      .create({
        message: 'Adding a word...'
      })
      .then(loadingEl =>
        {
          loadingEl.present();
          const data = resultData.data
          wordsService[method](data.newInputWord)
          .subscribe(
          () => {
            loadingEl.dismiss();
          });
        }
      );
    }
  });
}