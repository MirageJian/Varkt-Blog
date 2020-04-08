import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {slideFromBottom} from "@shared/animations";

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
  animations: [slideFromBottom()]
})
export class MarkdownEditorComponent implements OnInit {
  content: string;

  constructor(private render: Renderer2) { }

  ngOnInit() {
  }
  onSubmit() {

  }

  resizeTextarea(text: ElementRef) {
    this.render.setStyle(text, 'height', 'auto');
    this.render.setStyle(text, 'height', text.nativeElement.scrollHeight+'px');
  }

  insertImage() {
    return "<img src=\"\" width=\"100%\" alt=\"\">"
  }
}
