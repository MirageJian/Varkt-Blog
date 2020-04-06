import { Component, OnInit } from '@angular/core';
import {slideFromBottom} from "@shared/animations";

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
  animations: [slideFromBottom()]
})
export class MarkdownEditorComponent implements OnInit {
  content: string;

  constructor() { }

  ngOnInit() {
  }
  onSubmit() {

  }

  resizeTextarea(text: HTMLTextAreaElement) {
    text.style.height = 'auto';
    text.style.height = text.scrollHeight+'px';
  }

  insertImage() {
    return "<img src=\"\" width=\"100%\" alt=\"\">"
  }
}
