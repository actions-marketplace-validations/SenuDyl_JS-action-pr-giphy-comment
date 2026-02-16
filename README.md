# js-action-pr-giphy-comment

A GitHub Action that automatically adds animated GIF comments to pull requests using the Giphy API.

## Features

- Automatically comments on PRs with random GIFs
- Integrates with Giphy API
- Easy configuration

## Usage

```yaml
- uses: your-username/js-action-pr-giphy-comment@v1
    with:
        giphy-api-key: ${{ secrets.GIPHY_API_KEY }}
```

## Setup

1. Get a [Giphy API key](https://developers.giphy.com/)
2. Add it as a repository secret `GIPHY_API_KEY`
3. Use the action in your workflow
