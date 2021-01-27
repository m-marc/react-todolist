describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-example');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

describe('editableSpan', () => {
    it("should render span with 'HTML' inside", async () => {
        await page.goto('http://localhost:9009/iframe.html?id=todolist-editablespan--editable-span-example');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    })
})

describe('App', () => {
    it("App with initial data", async () => {
        await page.goto('http://localhost:9009/iframe.html?id=todolist-appwithredux--app-with-redux-example');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    })
})