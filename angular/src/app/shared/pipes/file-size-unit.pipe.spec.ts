import { FileSizePipe } from './file-size-unit.pipe';

describe('FileSizeUnitPipe', () => {
  it('create an instance', () => {
    const pipe = new FileSizePipe();
    expect(pipe).toBeTruthy();
  });
});
