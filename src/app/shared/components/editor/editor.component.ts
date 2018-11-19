import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {ResModel} from "../../models";
import * as Quill from 'quill';
import {FileUploadService} from "../../../app-services/file-upload.service";
import {NgModel} from "@angular/forms";

// declare var require: any;
// const Quill = require('quill');

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {
  @Input() quill: any;
  // async update quill, if use sync, it will occur the check error
  @Output() quillChange = new EventEmitter(true);
  @Output() onQuillInit = new EventEmitter(true);
  @Input() readonly: boolean = false;
  @ViewChild('editor') editor: ElementRef;
  @ViewChild('quillImgField') quillImgField: ElementRef;

  constructor(
    private fileUpload: FileUploadService,
  ) {
  }

  ngOnInit() {
    if (this.readonly) {
      this.readonlyQuillInit();
    } else {
      this.quillInit();
    }
  }

  private quillInit() {
    // quill init
    this.quill = new Quill(this.editor.nativeElement, {
      readOnly: false,
      modules: {
        toolbar: [
          [{'header': [false, 1, 2, 3, 4, 5, 6]}],
          [{'font': []}],
          [{'size': [false, 'small', 'large', 'huge']}],  // custom dropdown
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          [{'color': []}, {'background': []}],          // dropdown with defaults from theme
          ['blockquote', 'code-block'],
          [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
          [{'direction': 'rtl'}],                         // text direction
          [{'align': []}],
          ['link', 'image', 'video', 'formula'],
          ['clean'],
        ]
      }, theme: 'snow', placeholder: 'Please write something right here...', //debug: 'info',
    });
    this.quill.getModule('toolbar').addHandler('image', () => {
      // console.log(this.checkImg);
      this.quillImgField.nativeElement.onchange = () => {
        const file = this.quillImgField.nativeElement.files[0];//
        // console.log(formData);
        this.fileUpload.uploadArticleImage(file, 'article').subscribe((res: ResModel) => {
          if (res.errcode) {
            const range = this.quill.getSelection();
            this.quill.insertEmbed(range ? range.index : 0, 'image', res.data);
            this.quill.setSelection(range ? range.index + 1 : 0, 0);
            this.quillImgField.nativeElement.value = null;
          }
        });
      };
      this.quillImgField.nativeElement.click();
    });
    this.quillChange.emit(this.quill);
    this.onQuillInit.emit();
  }

  private readonlyQuillInit() {
    const options = {
      modules: {
        toolbar: false    // Snow includes toolbar by default
      },
      readOnly: true,
      theme: 'snow'
    };
    this.quill = new Quill(this.editor.nativeElement, options);
    this.quillChange.emit(this.quill);
    this.onQuillInit.emit();
  }

}
