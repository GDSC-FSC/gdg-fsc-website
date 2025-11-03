export const fixture_examples = 
  (await import(
    './example.json',
    { with: 
      { type: 'json' }
    })
  )
