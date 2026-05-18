import {Page, expect} from '@playwright/test'

export class Book {
    
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async searchBook (name: string, author: string) {
        //com este método, é possível com base no nome do livro e no autor, encontrar o resultado pretendido. Escolhe o primeiro livro da lista 
        const searchBook = this.page.getByPlaceholder('pesquisar')
        await searchBook.click()
        await searchBook.fill(name)
        await this.page.locator('[aria-label="pesquisar"]').click()
        await this.page.locator(`[data-product-name="${name}"]`, {hasText: author}).locator('.track').first().click()
    }


    async compareAuthors(bookName1: string, bookName2: string) { //ao introduzir o nome de 2 livros, vai confirmar se o autor dos 2 livros é o George Orwell
        const searchBook = this.page.getByPlaceholder('pesquisar')
        await searchBook.click()
        await searchBook.fill(bookName1)
        await this.page.locator('[aria-label="pesquisar"]').click()
        await this.page.locator(`[data-product-name="${bookName1}"]`, {hasText: "George Orwell"}).locator('.track').first().click()
        const authorName = await this.page.locator('#productPageRightSectionTop-author-lnk', {hasText: "George Orwell"}).textContent() //guarda o autor do 1º livro

        await this.page.goBack()
        await searchBook.click()
        await searchBook.fill(bookName2)
        await this.page.locator('[aria-label="pesquisar"]').click()
        await this.page.locator(`[data-product-name="${bookName2}"]`, {hasText: "George Orwell"}).locator('.track').first().click()
        const authorName2 = await this.page.locator('#productPageRightSectionTop-author-lnk', {hasText: "George Orwell"}).textContent() //guarda o autor do 2º livro
        expect(authorName2).toEqual(authorName) //compara o autor do livro 1 com o autor do livro 2
    }

    async validateAuthor(author: string) {
        const bookAuthor = this.page.locator('#productPageRightSectionTop-author-lnk') //localiza o autor
        await expect(bookAuthor).toHaveText(author) //confirma o nome do autor
    }

    async validateISBN(isbn: string) {
        const bookISBN = this.page.locator('#productPageSectionDetails-collapseDetalhes-content-isbn', {hasText: "ISBN:"}).locator('.info') //localiza o ISBN
        await expect(bookISBN).toHaveText(isbn) //confirma o ISBN
    }

    async validatePages(pages: string) {
        const bookPages = this.page.locator('#productPageSectionDetails-collapseDetalhes-content-nrPages', {hasText: "Páginas:"}).locator('.info') //localiza o numPaginas
        await expect(bookPages).toHaveText(pages) //confirma o número páginas
    }

    async validateDimension(dimension: string) {
         const bookDimension = this.page.locator('#productPageSectionDetails-collapseDetalhes-content-dimensions', {hasText: "Dimensões:"}).locator('.info') //localiza as dimensões
        await expect(bookDimension).toHaveText(dimension) //confirma as dimensões do livro
    }
    
    async validateLanguage()  {
        const bookLanguage = this.page.locator('#productPageRightSectionTop-language') //localiza o idioma
        await expect(bookLanguage).toContainText('Inglês') //confirma se o Idioma é Inglês
    }

    async validateFlag() {
        await expect(this.page.locator('#productPageRightSectionTop-languageFlag')).toHaveClass('icon language-flag Inglês') //confirma se a bandeira é do UK. Tive dificuldades em saber como criar este assertion, pois não conhecia o método toHaveClass
    }
}