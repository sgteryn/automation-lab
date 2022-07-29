const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

// navigate to movieList site
beforeAll(async () => {
    await driver.get('http://localhost:5500/movieList/index.html')
})

// And after our test has completed, we want to close our browser
afterAll(async () => {
    await driver.quit()
})

describe('movie-list tests',() => {
    //test to add movie
    test('check if movie is added to the list',async() => {
        //selecting the input element and sending it keys
        await driver.findElement(By.xpath('//input')).sendKeys('Black Panther')
        //selecting the button and clicking it
        await driver.findElement(By.xpath('//button')).click()
        const movie = await driver.findElement(By.xpath('//li'))
        const displayed = movie.isDisplayed()
        expect(displayed).toBeTruthy()
        await driver.sleep(3000)

    })
    //Test (1) to cross off movie
   test('check if movie can be crossed off list', async()=> {
     //find and click the li element
    await driver.findElement(By.xpath(`//li//span`)).click()
    
   let message = await driver.findElement(By.id(`message`)).getText()

    expect(message).toBe('Black Panther watched!')

    await driver.sleep(3000)
   }) 
//     //Test(2) to ucross a movie 
   test('check if uncrossing a movie works', async()=> {
      //find the li element
      await driver.findElement(By.xpath(`//li//span`)).click()

      let message = await driver.findElement(By.id(`message`)).getText()
      expect(message).toBe('Black Panther added back!')

    await driver.sleep(3000)
   }) 
 //Test(3) to delete Movie
   test('check if movie can be deleted', async()=> {
     //find the li element
     await driver.findElement(By.id('deleteButton'))
     await driver.sleep(3000)
     movie = await driver.findElement(By.xpath('//ul')).getText()

     movie = movie.split('x\n')

     let message = await driver.findElement(By.id("message")).getText()
     expect(message).toBe('Black Panther deleted!')


    await driver.sleep(3000)
   }) 
 })

