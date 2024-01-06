import React, { useId } from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    selectedCurrency="usd",
    currencyOpt=[],
    amountDisable=false,
    currencyDisable=false, 
}) {
    console.log(currencyOpt);
    const amountLabel = useId()
  return (
    <div className={`bg-white rounded-lg text-sm flex`}>
        <div className='w-1/2'>
            <label htmlFor={amountLabel} className='text-sm text-gray-500 inline-block mb-2'>
                {label}
            </label>
            <input 
            id={amountLabel}
            type="number"
            value={amount}
            onChange={(e)=>onAmountChange && onAmountChange(Number(e.target.value))} 
            className='outline-none w-full bg-transparent py-1.5'
            disabled={amountDisable}
            />
        </div>
        <div className='w-1/2'>
            <label htmlFor="" className='text-sm text-gray-500 inline-block mb-2'>
                Currency Type
            </label>
            <select
            value={selectedCurrency}
            onChange={e => onCurrencyChange && onCurrencyChange(e.target.value)}
            className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
            >
                {
                    currencyOpt.map((currency)=>(
                    <option 
                    key={currency}
                    value={currency}
                    >
                        {currency}
                    </option>
                    ))
                }
            </select>
        </div>
    </div>
  )
}

export default InputBox