# FFans Paste Link · 粘贴链接

[![许可证](https://img.shields.io/packagist/l/ffans/paste-link.svg?label=许可证)](https://raw.githubusercontent.com/ffans/paste-link/2.x/LICENSE) [![Flarum](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fffans%2Fpaste-link%2F1.x%2Fcomposer.json&query=%24.require%5B%22flarum%2Fcore%22%5D&label=Flarum)](https://docs.flarum.org/1.x/) [![最新版本](https://img.shields.io/github/v/tag/ffans/paste-link?filter=v1.*&sort=semver&label=最新版本)](https://github.com/ffans/paste-link/releases) [![Flarum](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fffans%2Fpaste-link%2F2.x%2Fcomposer.json&query=%24.require%5B%22flarum%2Fcore%22%5D&label=Flarum)](https://docs.flarum.org/2.x/) [![最新版本](https://img.shields.io/github/v/tag/ffans/paste-link?filter=v2.*&sort=semver&label=最新版本)](https://github.com/ffans/paste-link/releases) [![发布日期](https://img.shields.io/github/release-date/ffans/paste-link.svg?display_date=published_at&label=发布日期)](https://github.com/ffans/paste-link/releases/latest) [![总下载量](https://img.shields.io/packagist/dt/ffans/paste-link.svg?label=总下载量)](https://packagist.org/packages/ffans/paste-link/stats) [![月下载量](https://img.shields.io/packagist/dm/ffans/paste-link.svg?label=月下载量)](https://packagist.org/packages/ffans/paste-link/stats)

Turn selected text into a Markdown link by pasting a URL. This is a tiny quality-of-life enhancement for [Flarum](https://flarum.org)'s default Markdown composer. No settings, no permissions, just one paste listener.

> FoF Rich Text for Flarum 2.x provides similar paste-link behavior as part of its full rich-text editing experience. Paste Link is intended for communities that prefer default Markdown composer or still run Flarum 1.x.

## 要求

| Flarum | 扩展版本 | 分支   |
|--------|----------|--------|
| 2.x    | `1.0.0`  | `main` |
| 1.x    | `1.0.0`  | `main` |

## 安装

使用 Composer:

```sh
composer require ffans/paste-link:"*"
```

## 更新

```sh
composer update ffans/paste-link:"*"
php flarum cache:clear
```

## 链接

- [GitHub](https://github.com/ffans/paste-link)
- [Packagist](https://packagist.org/packages/ffans/paste-link)
- [英文社区](https://discuss.flarum.org/d/)
- [中文社区](https://discuss.flarum.org.cn/d/)

## 许可证

[MIT](LICENSE.md)。
