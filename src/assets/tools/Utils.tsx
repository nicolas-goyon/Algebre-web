export function inputValidator(event: React.FocusEvent<HTMLInputElement>) {
    const parent = event.target.parentElement as HTMLElement;
    const validationText = parent.querySelector(".validationText") as HTMLElement;
    if (event.target.value) {
        // hide error message and change border color to green
        validationText.style.display = "none";
        event.target.classList.remove("border-red-500");
    }
    else {
        // Show error message and change border color to red
        validationText.style.display = "block";
        event.target.classList.add("border-red-500");
    }
}
export function getCookie(name: string) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

export function compareMaps(map1 : Map<any, any>, map2 : Map<any, any>) {
    const arr1 = Array.from(map1);
    const arr2 = Array.from(map2);
    arr1.sort();
    arr2.sort();
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

export function compareRecords(record1 : Record<string, any>, record2 : Record<string, any>) {
    const arr1 = Object.entries(record1);
    const arr2 = Object.entries(record2);
    arr1.sort();
    arr2.sort();
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}
  