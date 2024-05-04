---
title: 開いているファイルの相対パスをコピーするneovimプラグインを作ってLazyVimで使えるようにする
date: 2024-05-05
---

テストファイルを指定してテストしたいとき、開いているファイルの相対パスを取得する、という操作を頻繁にしていたので neovim でも出来るように自作でプラグインを作ってみた。  
プラグインの構成はとてもシンプルで、clip-path.lua に処理を実装している

https://github.com/Ryutaro95/clip-path

```bash
.
├── lua
│  └── clip-path.lua
└── README.md
```

```lua
-- clip-path.lua
local M = {}

function M.copy_relative_file_path()
	local absolute_file_path = vim.api.nvim_buf_get_name(0)
	local git_path = vim.fn.system("git rev-parse --show-toplevel")

	local relative_file_path = "/" .. string.sub(absolute_file_path, git_path:len() + 1)
	local copy_command = "copied " .. '".' .. relative_file_path .. '"'
	vim.fn.system(copy_command)
	print(relative_file_path)
	print("command:" .. copy_command)
	return true
end

return M
```

処理としては、フルパスを取得して git 管理しているディレクトリからの相対パスをクリップボードにコピーするだけ  
普段使いしている LazyVim で使えるように、GitHub にリポジトリを作成して push する

## LazyVim で使えるようにインストールする

[LazyVim Plugins](https://www.lazyvim.org/configuration/plugins) にあるとおり、プラグインを追加する際は`lua/plugins/` 配下のファイルにプラグインを追加する設定を記述すればよいので、↓ のようにする

```lua
-- lua/plugins/editor.lua
return {
  {
    "Ryutaro95/clip-path",
    keys = {
      {
        "cp",
        function()
          require("clip-path").copy_relative_file_path()
        end,
      },
    },
  },
-- other plugins ...
}
```

`cp` とすることで、現在開いているファイルの相対パスを取得することができる。もし `;c` とかでコピーしたければ以下のように修正すれば変更できる

```lua
    keys = {
      {
        ";c",

```

もし、追加で機能を実装したくなったら、機能ごとのモジュールファイルを clip-path.lua から呼び出して行くことができると思う。

```bash
.
├── lua
│  ├─ clip-path -- モジュールを格納するディレクトリ
│  │  └─ module.lua -- モジュールファイル
│  └── clip-path.lua
└── README.md
```
