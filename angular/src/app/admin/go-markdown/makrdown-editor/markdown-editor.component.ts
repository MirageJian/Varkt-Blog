import {AfterViewInit, Component, ElementRef, forwardRef, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {FileUploadService} from "../../services/file-upload.service";
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
  // The value for this editor
  public value: string;
  public imagePasteListener: () => void;
  public tabKeydownListener: () => void;

  constructor(
    private renderer: Renderer2,
    private _fileUpload: FileUploadService,
  ) {}

  ngAfterViewInit(): void {
    /** Register paste listener */
    this.imagePasteListener = this.renderer.listen(this.textArea, 'paste', e => {
      // We need to check if event.clipboardData is supported (Chrome & IE)
      if (e.clipboardData && e.clipboardData.items) {
        // Get the items from the clipboard and loop through all items, looking for any kind of image
        for (let item of e.clipboardData.items)
          if (item.type.indexOf('image') !== -1) {
            // We need to represent the image as a file
            this.insertImage(item.getAsFile())
            // Prevent the image (or URL) from being pasted into the contenteditable element
            e.preventDefault();
          }
      }
    });
    /** Register tab keydown listener */
    this.tabKeydownListener = this.renderer.listen(this.textArea, 'keydown', e => {
      if (e.code == 'Tab') {
        e.preventDefault();
        this.handleTab();
      }
    });
  }

  /** Keyboard event handles */
  handleTab() {
    let customTab = ' '.repeat(4);
    const editor = this.getEditor();
    if (editor.selStart != editor.selEnd) {
      // If selected text, tab will insert into start of selection and before every line
      const lines = editor.selection.split('\n');
      // Change the middle inserts
      customTab = customTab + lines.join('\n' + customTab)
    }
    // If nothings selected, insert intends on the cursor
    editor.concatStartEnd(customTab);
    // If selected text, selected range still
    if (editor.selStart != editor.selEnd) editor.setSelRange(editor.selStart, editor.selEnd + customTab.length)
    this.refreshValue();
  }

  /** Markdown Toolbar Operations */
  insertImage(file?: File) {
    // If there is no file passed into this method
    if (!file) file = this.imgUploadInput.nativeElement.files[0];
    // console.log(formData);
    this._fileUpload.uploadArticleImage(file).subscribe((res: string) => {
      // Upload image successfully and get selection cursor
      this.getEditor().concatStartEnd(`<img src=\"${res}\" width=\"100%\" alt=\"\">`);
      this.refreshValue();
    });
  }

  insertCodeBlock() {
    let startTag = '```javascript\n', endTag = '```\n';
    const editor = this.getEditor();
    // If there is section, add new line before end tag
    if (editor.selection.length) endTag = '\n' + endTag;
    // Concat all things
    editor.concatStartEnd(startTag + editor.selection + endTag);
    // Select code language label
    editor.setSelRange(editor.selStart + 3, editor.selStart + startTag.length - 1)
    // Refresh after selecting text
    this.refreshValue();
  }

  insertLink() {
    const editor = this.getEditor();
    let startTag = '[', endTag = ']()';
    let start = editor.selEnd + 3, end = editor.selEnd + 3;
    // If selected link
    if (editor.selection.match('://')) {
      // Put the cursor in round bracket
      startTag = '[]('; endTag = ')';
      start = editor.selStart + 1; end = editor.selStart + 1;
    }
    editor.concatStartEnd(startTag + editor.selection + endTag);
    editor.setSelRange(start, end);
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

  // Get editor properties from textarea
  private getEditor() {
    const value = this.textArea.value, selStart = this.textArea.selectionStart, selEnd = this.textArea.selectionEnd;
    return {
      value: value, selStart: selStart, selEnd: selEnd, selection: value.substring(selStart, selEnd),
      concatStartEnd: (insertValue: string) =>
        this.textArea.value = value.substring(0, selStart) + insertValue + value.substring(selEnd),
      setSelRange: (start, end) => this.textArea.setSelectionRange(start, end)
    }
  }

  // Example of insert paired tags for textarea:
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement#Insert_HTML_tags_example

  /** Ng model implementation */
  onChange: (_: any) => void = (_: any) => {};
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
    this.tabKeydownListener();
  }
}
