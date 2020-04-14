import {Component, ElementRef, forwardRef, Renderer2, ViewChild} from '@angular/core';
import {ResModel} from "@shared/models";
import {FileUploadService} from "@app-services/file-upload.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MarkdownEditorComponent),
    multi: true
  }]
})
export class MarkdownEditorComponent implements ControlValueAccessor {
  @ViewChild('imgUploadInput') imgUploadInput: ElementRef;
  @ViewChild('text') textAreaElement: ElementRef;
  public value: string;

  constructor(
    private render: Renderer2,
    private _fileUpload: FileUploadService,
  ) {
  }

  /**
   Markdown Text Operation Method
   */

  insertImage() {
    const file = this.imgUploadInput.nativeElement.files[0];
    // console.log(formData);
    this._fileUpload.uploadArticleImage(file).subscribe((res: ResModel) => {
      if (!res.code) {
        // Upload image successfully and get selection cursor
        const selectionStart = this.textArea.selectionStart;
        this.value = this.value.slice(0, selectionStart)
          + `<img src=\"${res.data}\" width=\"100%\" alt=\"\">`
          + this.value.slice(selectionStart);
      }
    });
  }

  insertCodeBlock() {
    const startTag = '```\n', endTag = '\n```';
    const value = this.textArea.value, selStart = this.textArea.selectionStart, selEnd = this.textArea.selectionEnd;
    this.textArea.value = value.substring(0, selStart) + (startTag + value.substring(selStart, selEnd) + endTag) + value.substring(selEnd);
    this.textArea.setSelectionRange(selStart + 3, selStart + 3);
    this.textArea.focus();
    // Change the value of editor
    this.value = this.textArea.value;
    this.onChange(this.value);
  }

  insertLink() {
    let startTag = '[', endTag = ']()';
    const value = this.textArea.value, selStart = this.textArea.selectionStart, selEnd = this.textArea.selectionEnd;
    const selection = value.substring(selStart, selEnd);
    // If selected link
    if (selection.match('://')) { startTag = '[]('; endTag = ')'; }
    this.textArea.value = value.substring(0, selStart) + (startTag + selection + endTag) + value.substring(selEnd);
    // If selected link
    if (selection.match('://'))
      this.textArea.setSelectionRange(selStart + 1, selStart + 1);
    else this.textArea.setSelectionRange(selEnd + 3, selEnd + 3);
    this.textArea.focus();
    // Change the value of editor
    this.value = this.textArea.value;
    this.onChange(this.value);
  }

  private get textArea(): HTMLTextAreaElement {
    return this.textAreaElement.nativeElement as HTMLTextAreaElement
  }

  // Example of insert paired tags
  private insertMetachars(sStartTag, sEndTag) {
    const bDouble = arguments.length > 1,
      oMsgInput = this.textArea,
      nSelStart = oMsgInput.selectionStart,
      nSelEnd = oMsgInput.selectionEnd,
      sOldText = oMsgInput.value;
    oMsgInput.value = sOldText.substring(0, nSelStart) + (bDouble ? sStartTag + sOldText.substring(nSelStart, nSelEnd) + sEndTag : sStartTag) + sOldText.substring(nSelEnd);
    oMsgInput.setSelectionRange(bDouble || nSelStart === nSelEnd ? nSelStart + sStartTag.length : nSelStart, (bDouble ? nSelEnd : nSelStart) + sStartTag.length);
    oMsgInput.focus();
  }

  /**
   Ng model implementation
   */
  onChange: (_: any) => void = (_: any) => {
  };
  onTouched: () => void;

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
    this.onChange(this.value);
  }

  resizeTextarea() {
    this.render.setStyle(this.textAreaElement.nativeElement, 'height', 'auto');
    this.render.setStyle(this.textAreaElement.nativeElement, 'height', this.textAreaElement.nativeElement.scrollHeight + 'px');
  }

}
