import { test, expect } from '@playwright/test';
import {Book} from '../bookSelection/book'

/*Scenario 1:

Search for the book "1984."
Validate that the author is "George Orwell."
Confirm that the ISBN is "9789722071550."
Check that the number of pages is "344."
Ensure that the dimensions of the book are "156 x 238 x 22 mm."*/

test.beforeEach(async({page}) => {
    await page.goto("https://www.bertrand.pt/") //para abrir o URL para cada test case
})

    test('Scenario 1', async({page}) => {
        test.setTimeout(10000)

        const book = new Book(page)
        await book.searchBook("1984", "George Orwell")
    
        await book.validateAuthor('George Orwell')
        await book.validateISBN('9789722071550')
        await book.validatePages('344')
        await book.validateDimension('156 x 238 x 22 mm')
    })

/*Scenario 2:

Search for the book "1984."
Verify that the book "A Quinta dos Animais" is authored by the same author.*/

    test('Scenario 2', async({page}) => {
        test.setTimeout(10000)

        const book = new Book(page)
        await book.compareAuthors('1984', 'A Quinta dos Animais')      
    })

/*Scenario 3:

Search for the book "Do Not Disturb."
Validate that the author is "Freida McFadden"
Validate the idiom is "Inglês" and the flag of UK is displayed*/


    test('Scenario 3', async({page}) => {
        test.setTimeout(10000)

        const book = new Book(page)
        await book.searchBook('Do Not Disturb', 'Freida McFadden')      

        await book.validateAuthor('Freida McFadden')
        await book.validateLanguage()
        await book.validateFlag()    
    })