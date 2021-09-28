import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { NewNounComponent } from '../new-noun/new-noun.component';
import { NewVerbComponent } from '../new-verb/new-verb.component';
import { NewWordComponent } from '../new-word/new-word.component';
import { KindOfWordUtil } from '../shared/kindOfWordUtil';
import { openAddWordModal } from '../shared/openAddWordModal';
import { KindWord } from '../word.module';
import { WordsService } from '../words.service';

@Component({
  selector: 'app-manual-add-word',
  templateUrl: './manual-add-word.page.html',
  styleUrls: ['./manual-add-word.page.scss'],
})
export class ManualAddWordPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private wordsService: WordsService,
    private kindOfWordUtil: KindOfWordUtil
  ) { }

  ngOnInit() {
  }

  addWord(kindOfWord: string){
    let kind = this.kindOfWordUtil.retrieveKindFromString(kindOfWord);
    switch (kind) {
      case KindWord.Adjective: case KindWord.Adverb: case KindWord.Preposition: case KindWord.Conjunction:
        openAddWordModal(this.modalCtrl, this.loadingCtrl, this.wordsService, {component: NewWordComponent, componentProps: {kind: kind}}, 'addWord');
        break;
      case KindWord.Verb:
        openAddWordModal(this.modalCtrl, this.loadingCtrl, this.wordsService, {component: NewVerbComponent, componentProps: {kind: kind}}, 'addVerb');
        break;
      default:
        openAddWordModal(this.modalCtrl, this.loadingCtrl, this.wordsService, {component: NewNounComponent, componentProps: {kind: kind}}, 'addNoun');
        break;
    }
  }

}
