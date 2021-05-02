const postcss = require('postcss')

const plugin = require('./')

async function run(input, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  return result
}

// a simple template literal to piggyback on css`` string formatting
function css(arr) {
  return arr[0]
}

it('adds theme values', async () => {
  const result = await run(
    css`
      @import 'molehill/theme';

      a {
        color: blue;
      }
    `,
    {}
  )

  expect(result.css).toMatchInlineSnapshot(`
    ":root {
            --some-var: black;
    }

          a {
            color: blue;
          }
        "
  `)

  expect(result.warnings()).toHaveLength(0)
})
