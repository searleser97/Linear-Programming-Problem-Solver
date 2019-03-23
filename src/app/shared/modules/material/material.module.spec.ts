import { MaterialModule } from './material.module';

describe('MaterialModule', () => {
  let materialModule: MaterialModule;

  beforeEach(() => {
    materialModule = new MaterialModule();
  });

  it('should create-human-resource an instance', () => {
    expect(materialModule).toBeTruthy();
  });
});
