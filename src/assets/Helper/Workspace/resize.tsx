import { WorkspaceSvg, svgResize } from "blockly";

export const resize = (blocklyDiv: HTMLElement, blocklyArea: HTMLElement, workspace: WorkspaceSvg) => {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    let element: any = blocklyArea;
    let x = 0;
    let y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    svgResize(workspace);
}