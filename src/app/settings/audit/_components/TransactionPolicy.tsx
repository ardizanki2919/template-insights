import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { CategoryBar } from "@/components/CategoryBar"
import { Input } from "@/components/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { cx } from "@/lib/utils"
import { ChevronRight, Trash2 } from "lucide-react"
import { useState } from "react"

const blacklist = [
  {
    category: "Blocked transactions",
    value: "$4,653 volume",
    description: "1,234",
    color: "bg-rose-600 dark:bg-rose-500",
  },
  {
    category: "Suspicious transactions",
    value: "$1,201 volume",
    description: "319",
    color: "bg-orange-500 dark:bg-orange-500",
  },
  {
    category: "Successful transactions",
    value: "$213,642 volume",
    description: "10,546",
    color: "bg-gray-500 dark:bg-gray-500",
  },
]

const keywords = [
  {
    label: "Coffee shop",
    value: "coffee-shop",
    flagged: 831,
    category: "block",
  },
  {
    label: "Club & bar",
    value: "club-bar",
    flagged: 213,
    category: "block",
  },
  {
    label: "Sports",
    value: "sports",
    flagged: 198,
    category: "suspicious",
  },
  {
    label: "Gamble",
    value: "gamble",
    flagged: 172,
    category: "block",
  },
  {
    label: "Liquor",
    value: "liquor",
    flagged: 121,
    category: "suspicious",
  },
]

const keywordCategories = [
  {
    value: "Block",
    color: "bg-rose-600 dark:bg-rose-500",
    description: "Blocks transactions, preventing payment.",
  },
  {
    value: "Suspicious",
    color: "bg-orange-500 dark:bg-orange-500",
    description: "Processes transactions but flags for audit.",
  },
]

const getStateColor = (state: string) => {
  const category = keywordCategories.find(
    (category) => category.value === state,
  )
  return category ? category.color : null
}

export default function TransactionPolicy() {
  const [isSpendMgmtEnabled, setIsSpendMgmtEnabled] = useState(true)
  const [value, setValue] = useState("Block")

  return (
    <section aria-labelledby="transaction-policy">
      <div className="grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-3">
        <div>
          <h2
            id="transaction-policy"
            className="scroll-mt-10 font-semibold text-gray-900 dark:text-gray-50"
          >
            Transaction policy
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-500">
            Block transactions by keywords or merchant category.
          </p>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Overview of blocked transactions
          </h3>
          <CategoryBar
            values={[8, 3, 89]}
            colors={["rose", "orange", "gray"]}
            showLabels={false}
            className="mt-10"
          />
          <ul role="list" className="mt-6 flex flex-wrap gap-12">
            {blacklist.map((item) => (
              <li key={item.category} className="flex items-start gap-2.5">
                <span
                  className={cx(item.color, "mt-[2px] size-2.5 rounded-sm")}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm leading-none text-gray-600 dark:text-gray-400">
                    {item.category}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50">
                    {item.description}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.value}
                  </p>
                  <a
                    href="#"
                    className="mt-2.5 flex items-center gap-0.5 text-sm font-normal text-blue-600 hover:underline hover:underline-offset-4 dark:text-blue-500"
                  >
                    Details
                    <ChevronRight
                      className="size-4 shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
              Keyword / Merchant category
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
              # of transactions
            </p>
          </div>
          <ul
            role="list"
            className="mt-1 divide-y divide-gray-200 dark:divide-gray-800"
          >
            {keywords.map((item) => (
              <li
                key={item.value}
                className="flex items-center justify-between py-2.5"
              >
                <Badge
                  variant={item.category === "block" ? "error" : "warning"}
                  className="gap-2"
                >
                  <span
                    className={cx(
                      item.category === "block"
                        ? "bg-rose-500 dark:bg-rose-500"
                        : "bg-orange-500 dark:bg-orange-500",
                      "size-2 rounded-sm",
                    )}
                    aria-hidden="true"
                  />
                  {item.label}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="pr-2 text-sm text-gray-600 dark:text-gray-400">
                    {item.flagged}
                  </span>
                  <span
                    className="h-5 w-px bg-gray-200 dark:bg-gray-800"
                    aria-hidden="true"
                  />
                  <Button
                    variant="ghost"
                    className="p-2.5 text-gray-600 hover:border hover:border-gray-300 hover:bg-gray-50 hover:text-rose-500 dark:text-gray-400 hover:dark:border-gray-800 hover:dark:bg-gray-900 hover:dark:text-rose-500"
                  >
                    <Trash2 className="size-4 shrink-0" aria-hidden="true" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div
            className={cx(
              "transform-gpu transition-all ease-[cubic-bezier(0.16,1,0.3,1.03)] will-change-transform",
              isSpendMgmtEnabled ? "" : "",
            )}
            style={{
              transitionDuration: "300ms",
              animationFillMode: "backwards",
            }}
          >
            <div
              className={cx(
                "animate-slideDownAndFade transition",
                isSpendMgmtEnabled ? "hidden" : "",
              )}
              style={{
                animationDelay: "100ms",
                animationDuration: "300ms",
                transitionDuration: "300ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="mt-4 flex flex-col items-center gap-2 rounded-md bg-gray-50 p-4 ring-1 ring-inset ring-gray-200 sm:flex-row">
                <div className="flex w-full items-center gap-2">
                  <Select value={value} onValueChange={setValue}>
                    <SelectTrigger className="w-48">
                      <SelectValue aria-label={value}>
                        <div className="flex items-center gap-2">
                          <div
                            className={cx(
                              "size-3 shrink-0 rounded",
                              getStateColor(value),
                            )}
                          />
                          <p>{value}</p>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {keywordCategories.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          <div className="flex items-center gap-2">
                            <div
                              className={cx(
                                "size-3 shrink-0 rounded",
                                item.color,
                              )}
                            />
                            <p>{item.value}</p>
                          </div>
                          <span className="ml-5 text-sm font-normal text-gray-700">
                            {item.description}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input placeholder="Insert keyword" />
                </div>
                <div className="flex w-full flex-col items-center gap-2 sm:w-fit sm:flex-row">
                  <Button
                    variant="secondary"
                    className="w-full sm:w-fit"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsSpendMgmtEnabled(!isSpendMgmtEnabled)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full sm:w-fit">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            className="mt-4 w-full sm:w-fit"
            onClick={(e) => {
              e.preventDefault()
              setIsSpendMgmtEnabled(!isSpendMgmtEnabled)
            }}
            // @Sev: modify such that if input field is shown -> clicking on "Add keyword" again does not let it disappear
          >
            Add keyword
          </Button>
        </div>
      </div>
    </section>
  )
}
