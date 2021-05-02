module.exports = () => {
  return {
    postcssPlugin: 'postcss-molehill',
    AtRule(atRule, { Rule, Declaration }) {
      console.log(atRule)
      if (
        atRule.name === 'import' &&
        atRule.params.includes('molehill/theme')
      ) {
        let rule = new Rule({ selector: ':root' })
        let color = new Declaration({ prop: '--some-var', value: 'black' })
        rule.append(color)

        atRule.replaceWith(rule)
      }
    },
  }
}

module.exports.postcss = true
