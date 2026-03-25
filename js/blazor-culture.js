// Blazor culture functions - exact copy
window.blazorCulture = {
    get: () => localStorage['BlazorCulture'],
    set: (value) => localStorage['BlazorCulture'] = value
};