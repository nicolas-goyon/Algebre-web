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