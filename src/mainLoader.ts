import * as ex from 'excalibur';

/**
 * The engine-level loader. Excalibur's lifecycle hooks are all overridden here so the
 * loading progress can be watched from the console while assets come in.
 */
export class MainLoader extends ex.DefaultLoader {
  override onUpdate(): void {
    // Called every tick while loading — `progress` is a number in [0, 1].
    console.log(this.progress);
  }

  override onDraw() {
    console.log(this.progress);
  }

  override async onUserAction(): Promise<void> {
    // Resolves as soon as it is called, so the loader does not wait for a click.
    // Browsers keep audio locked until the user interacts; this game has no audio.
  }

  override async onBeforeLoad(): Promise<void> {
    console.log('Hello Loader');
  }

  override async onAfterLoad(): Promise<void> {
    // Nothing to do once loading has finished.
  }
}
