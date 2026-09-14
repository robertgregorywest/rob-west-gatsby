# Creating the Kontent draft

IDs below are copied from the Kontent `article` content type, the `meta_data` snippet and the component types. Kontent is the source of truth: if a call rejects an ID, re-read the type with `get-content-type` and correct this file.

Language: `00000000-0000-0000-0000-000000000000` (en-GB, default).

## 1. Create the item

`create-content-item` with `name` set to the title and `type` `{ "id": "c04e07ca-cc64-4ad3-b7fa-113caf46f1ff" }` (Article). Keep the returned item ID.

## 2. Create the variant

`create-content-item-variant` with the item ID, the language ID, and these elements (reference each by `element.id`):

| Element | ID | Value |
| --- | --- | --- |
| Title | `2deed8b0-a09c-4705-8fd9-037edc5e04d6` | text |
| Publish Date | `62f681b0-a674-4796-b3be-2482e1d7ffed` | today, `YYYY-MM-DDT00:00:00Z`, `display_timezone: null` |
| Body | `1f7bb744-a4ce-4c26-8c8f-892fd30a629d` | rich text plus `components` array (below) |
| Title Url Slug | `9b059a68-e3cc-4e22-b20b-c20099f58f8e` | slug, `mode: "custom"` |
| Summary | `4f38614e-8bc2-4dfe-b0c2-dfe75ff1ae16` | text |
| Meta description | `eed766b4-f09f-453d-a2a5-d4b3e5b47c29` | text |
| Meta keywords | `15cde0f5-1606-430a-8da2-30fd4dd2c293` | text |
| Article Topics | `fff9527a-a6a4-4f65-b590-9dbc6aa32bc3` | taxonomy term IDs |

Taxonomy terms come from group `3c73e6c3-00eb-465c-b641-71eddb920ae3`; fetch them with `get-taxonomy-group`. A term that doesn't exist yet is left out and named in the editorial note for Rob to create.

Add a variant `note` listing anything Rob must check before publishing (the editorial note, placeholder publish date).

## 3. Components in the body

Replace each placeholder paragraph with `<object type="application/kenticocloud" data-type="component" data-id="NEW-UUID"></object>`, generating a fresh UUID per component, and add a matching entry to the Body's `components` array:

- `[BLOCKQUOTE]`: type `a29c5520-7580-4b79-8646-e40d0e510185`, element `8e390706-ed2c-4ab2-97fe-8b0f83720387` (text: the quotation with its source).
- `[CODE: language]`: type `0ed92bd1-7496-4ba6-adde-7b0b360fe1e0`, elements `c9d95b91-4b9c-41f4-b194-75e4abeea44a` (code) and `feaccd9a-2520-476b-995d-f8963cf3f12a` (language).

Example entry:

```json
{ "id": "NEW-UUID", "type": { "id": "a29c5520-7580-4b79-8646-e40d0e510185" },
  "elements": [ { "element": { "id": "8e390706-ed2c-4ab2-97fe-8b0f83720387" }, "value": "Quotation text" } ] }
```

## 4. Leave it as a draft

The variant is created in the first workflow step. Publishing is Rob's decision, made in Kontent.
