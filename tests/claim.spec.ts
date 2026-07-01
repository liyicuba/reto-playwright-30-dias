import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { SidePanel, SidePanelItems } from '../components/SidePanel';

test('capture all amounts', async ({ page }) => {
    
    await page.goto('/web/index.php/claim/viewAssignClaim')
    await page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row').first().waitFor()

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    const amounts: number[] = []

    const rowCount = await allBodyRows.count()
    console.log('Row count:', rowCount)
    for (let i = 0; i < rowCount; i++) {
        const amountCell = allBodyRows.nth(i).getByRole('cell').nth(7)
        const amountText = await amountCell.textContent()
        console.log('Amount text:', amountText)


        if (amountText === null) {
            continue;
        }

        const convertedAmount = parseFloat(amountText.replace(/,/g, '').trim())
        amounts.push(convertedAmount)
    }

    console.log('Amounts:', amounts)

    let totalAmount = 0
    for (const amount of amounts) {
        totalAmount += amount
    }

    console.log('Total Amount:', totalAmount)

    //reto 14 resta algunos valores
    const resta = amounts[5] - amounts[6]
    console.log('Resta:', resta)

    const indicesQueQuiero = [5, 6]
    const sumaParcial = indicesQueQuiero.reduce((sum, i) => sum + amounts[i], 0)
    console.log('Suma parcial:', sumaParcial)

})

