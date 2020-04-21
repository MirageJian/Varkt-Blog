import {AfterViewInit, Component, ElementRef, forwardRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
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
export class MarkdownEditorComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @ViewChild('imgUploadInput') imgUploadInput: ElementRef;
  @ViewChild('text') textAreaElement: ElementRef;
  public value: string;
  public imagePasteListener: () => void;
  public tabKeydownListener: () => void;

  constructor(
    private renderer: Renderer2,
    private _fileUpload: FileUploadService,
  ) {
  }
  ngAfterViewInit(): void {
    /** Register paste listener */
    this.imagePasteListener = this.renderer.listen(this.textAreaElement.nativeElement, 'paste', e => {
      // We need to check if event.clipboardData is supported (Chrome & IE)
      if (e.clipboardData && e.clipboardData.items) {
        // Get the items from the clipboard and loop through all items, looking for any kind of image
        for (let item of e.clipboardData.items)
          if (item.type.indexOf('image') !== -1)  {
            // We need to represent the image as a file
            this.insertImage(item.getAsFile())
            // Prevent the image (or URL) from being pasted into the contenteditable element
            e.preventDefault();
          }
      }
    });
    /** Register tab keydown listener */
    this.tabKeydownListener = this.renderer.listen(this.textAreaElement.nativeElement, 'keydown', e => {
      if (e.code == 'Tab') {
        e.preventDefault();
        this.handleTab();
      }
    });
  }
  /** Keyboard event handles */
  handleTab() {
    let customTab = ' '.repeat(4);
    const value = this.textArea.value, selStart = this.textArea.selectionStart, selEnd = this.textArea.selectionEnd;
    if (selStart != selEnd) {
      // If selected text, tab will insert into start of selection and before every line
      const selection = value.substring(selStart, selEnd);
      const lines = selection.split('\n');
      // Change the middle inserts
      customTab = customTab + lines.join('\n' + customTab)
    }
    // If nothings selected, insert intends on the cursor
    this.textArea.value = value.substring(0, selStart) + customTab + value.substring(selEnd);
    // If selected text, selected range still
    if (selStart != selEnd) this.textArea.setSelectionRange(selStart, selEnd + customTab.length);
    this.refreshValue();
  }

  /** Markdown Toolbar Operations */
  insertImage(file?: File) {
    // If there is no file passed into this method
    if (!file) file = this.imgUploadInput.nativeElement.files[0];
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
    // Refresh after selecting text
    this.refreshValue();
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
    // Refresh after selecting text
    this.refreshValue();
  }
  /** Frequently called methods */
  private get textArea(): HTMLTextAreaElement {
    return this.textAreaElement.nativeElement as HTMLTextAreaElement
  }
  // Refresh ngModel value and focus textarea
  private refreshValue() {
    this.textArea.focus();
    // Change the value of editor
    this.value = this.textArea.value;
    this.onChange(this.value);
  }

  // Example of insert paired tags
  private insertMetachars(sStartTag, sEndTag?) {
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
  // Destroy listeners
  ngOnDestroy(): void {
    this.imagePasteListener();
  }
}
