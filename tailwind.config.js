theme: {
  extend: {
    fontFamily: {
      chinese: (
        theme(
          'fontFamily.sans',
          [
            '"Microsoft YaHei"',
            '"PingFang SC"',
            '"Hiragino Sans GB"',
            'sans-serif'
          ],
          {
            fontFeatureSettings: '"cv11"',
          }
        )
      )
    }
  }
}