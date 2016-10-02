set nocompatible
if has('vim_starting')
set runtimepath+=~/.vim/bundle/neobundle.vim
endif
call neobundle#begin(expand('~/.vim/bundle/'))
NeoBundleFetch 'Shougo/neobundle.vim'

NeoBundle 'Shougo/neobundle.vim'
NeoBundle 'Shougo/unite.vim'
NeoBundle 'Shougo/neosnippet.vim'
NeoBundle 'scrooloose/nerdtree'
NeoBundle 'Townk/vim-autoclose'
NeoBundle 'surround.vim'
NeoBundle 'mattn/emmet-vim'
NeoBundle 'tomasr/molokai'
NeoBundle 'ujihisa/unite-colorscheme'
NeoBundle 'Shougo/neocomplcache'
NeoBundle 'Shougo/vimproc'

call neobundle#end()
filetype plugin indent on


colorscheme molokai
syntax on
let g:molokai_original = 1
let g:rehash256 = 1
set laststatus=2
set hidden
set backspace=indent,eol,start " バックスペースでなんでも消せるように "
set autoread
set number "行番号を表示する
set title "編集中のファイル名を表示
set whichwrap=b,s,<,>,[,]
set showmatch "括弧入力時の対応する括弧を表示
syntax on "コードの色分け

set smarttab
set shiftwidth=4    "行頭での<Tab>の幅
set tabstop=4   "行頭以外での<Tab>の幅
set expandtab   "<Tab>の代わりに<Space>を挿入する
set softtabstop=4   "expandtabで<Tab>が対応する<Space>の数"

set smartindent "オートインデント
set ignorecase "大文字/小文字の区別なく検索する
set smartcase "検索文字列に大文字が含まれている場合は区別して検索する
set wrapscan "検索時に最後まで行ったら最初に戻る
set encoding=utf-8
set fileencoding=utf-8
set fileencodings=utf-8,iso-2022-jp,sjis,euc-jp
set ambiwidth=double
set t_Co=256
set clipboard=unnamedplus
highlight Normal ctermbg=none
"隠しファイルを表示する。
let NERDTreeShowHidden = 1 
autocmd BufRead *.php\|*.ctp\|*.tpl :set dictionary=~/.vim/dict/php.dict filetype=php
let g:neocomplcache_enable_at_startup = 1
let g:neocomplcache_enable_camel_case_completion = 1
let g:neocomplcache_enable_underbar_completion = 1
let g:neocomplcache_smart_case = 1
let g:neocomplcache_min_syntax_length = 3
let g:neocomplcache_manual_completion_start_length = 0
let g:neocomplcache_caching_percent_in_statusline = 1
let g:neocomplcache_enable_skip_completion = 1
let g:neocomplcache_skip_input_time = '0.5'

set list
set listchars=tab:>-,trail:-,nbsp:%,extends:>,precedes:<,eol:<

set display=lastline "長文を表示させる

imap <expr> <TAB> pumvisible() ? "\<Down>" : "\<Tab>"
