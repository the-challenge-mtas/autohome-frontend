import { customElement } from "lit/decorators";
import { getCardFeatureElementClass } from "../../create-element/create-card-feature-element";
import type {
  LovelaceCardFeatureConfig,
  LovelaceCardFeatureContext,
} from "../../card-features/types";
import type {
  LovelaceConfigForm,
  LovelaceCardFeatureEditor,
} from "../../types";
import { HuiTypedElementEditor } from "../hui-typed-element-editor";

@customElement("hui-card-feature-element-editor")
export class HuiCardFeatureElementEditor extends HuiTypedElementEditor<
  LovelaceCardFeatureConfig,
  LovelaceCardFeatureContext
> {
  protected async getConfigElement(): Promise<
    LovelaceCardFeatureEditor | undefined
  > {
    const elClass = await getCardFeatureElementClass(this.configElementType!);

    // Check if a GUI editor exists
    if (elClass && elClass.getConfigElement) {
      return elClass.getConfigElement();
    }

    return undefined;
  }

  protected async getConfigForm(): Promise<LovelaceConfigForm | undefined> {
    const elClass = await getCardFeatureElementClass(this.configElementType!);

    // Check if a schema exists
    if (elClass && elClass.getConfigForm) {
      return elClass.getConfigForm();
    }

    return undefined;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-card-feature-element-editor": HuiCardFeatureElementEditor;
  }
}
