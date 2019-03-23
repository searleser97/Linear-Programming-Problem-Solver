import { AutoFocusModule } from './auto-focus.module';

describe('AutoFocusModule', () => {
  let autoFocusModule: AutoFocusModule;

  beforeEach(() => {
    autoFocusModule = new AutoFocusModule();
  });

  it('should create-human-resource an instance', () => {
    expect(autoFocusModule).toBeTruthy();
  });
});
