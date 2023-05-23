import { serialization } from "blockly";

export type WsSerialized =  {
    languageVersion: number;
    blocks: serialization.blocks.State[];
} | null;