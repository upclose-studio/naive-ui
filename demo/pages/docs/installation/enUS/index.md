<!--anchor:on-->

# Installation

> Please note that naive-ui only supports Vue3. If you are using Vue2, you may look at other libraries.

## GitHub Release

This fork is not published on npm. Install the v1.0.0 tarballs from [upclose-studio/naive-ui](https://github.com/upclose-studio/naive-ui/releases):

```json
{
  "dependencies": {
    "naive-ui": "https://github.com/upclose-studio/naive-ui/releases/download/v1.0.0/naive-ui-1.0.0.tgz",
    "naive-ui-nuxt": "https://github.com/upclose-studio/naive-ui/releases/download/v1.0.0/naive-ui-nuxt-1.0.0.tgz"
  }
}
```

```bash
bun add https://github.com/upclose-studio/naive-ui/releases/download/v1.0.0/naive-ui-1.0.0.tgz
```

A `github:upclose-studio/naive-ui` git dependency will not work — the repository does not contain the built `es/`, `lib/`, or `dist/` files.

## UMD

Please refer to [Using UMD](umd).

## Fonts

```bash
npm i vfonts
```

## Icons

naive-ui recommends using [xicons](https://www.xicons.org) as icon library.

## Design Resources

<n-card size="small" footer-style="text-align: center;" style="width: 420px; max-width: 100%;">
  <template #cover>
    <img src="https://naive-ui.oss-accelerate.aliyuncs.com/naive-design.png">
  </template>
  <template #footer>
    <n-button
      tag="a"
      href="https://naive-ui.oss-accelerate.aliyuncs.com/NaiveUI-Design-Library-en-US.sketch"
      text
      target="_blank"
      icon-placement="right"
    >
      Naive UI (Sketch)
      <template #icon>
        <n-icon >
          <ArrowDownload16Regular />
        </n-icon>
      </template>
    </n-button>
  </template>
</n-card>

```component
ArrowDownload16Regular: import ArrowDownload16Regular from '@vicons/fluent/ArrowDownload16Regular'
```
