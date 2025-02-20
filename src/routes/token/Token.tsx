import Card from "@/components/card/Card"
import LabelValue from "@/interfaces/CodeLabelValue"
import TokenInformation from "@/interfaces/TokenInformation"
import { getInfosToken, getTokens } from "@/services/token"
import { Descriptions, Form, Select } from "antd"
import { useEffect, useState } from "react"

const Token = () => {
    const [tokens, setTokens] = useState<LabelValue[]>([])
    const [tokenInformation, setTokenInformation] = useState<TokenInformation>()
    
    const onSelect = (value: string) => {
        void getInfosToken(value).then((res) => {
            setTokenInformation(res)
        })
    }

    const resetFields = () => {
        setTokenInformation(undefined)
    }

    useEffect(() => {
        void getTokens().then(list => {
            setTokens(list)
        })
    })

    return(
        <Card
        title="Saisissez vos informations pour un token"
        >
            <div>Choisissez votre token !<div className="form-row">
                <Form.Item>
                    <Select
                    placeholder="Sélectionner un token"
                    options={tokens}
                    onChange={onSelect}
                    onClear={resetFields}
                    allowClear
                     />
                </Form.Item>
                <Descriptions title="infosToken">
                    <Descriptions.Item label="nom">{tokenInformation?.nom}</Descriptions.Item>
                    <Descriptions.Item label="detenu">{tokenInformation?.detenu}</Descriptions.Item>
                    <Descriptions.Item label="reel">{tokenInformation?.reel}</Descriptions.Item>
                    <Descriptions.Item label="detenuEnDollars">{tokenInformation?.detenuEnDollars}</Descriptions.Item>
                    <Descriptions.Item label="pourcentagePortefeuille">{tokenInformation?.pourcentagePortefeuille}</Descriptions.Item>
                    <Descriptions.Item label="tendanceH24">{tokenInformation?.tendanceH24}</Descriptions.Item>
                </Descriptions>
                </div>
            </div>
            
        </Card>
    )
}

export default Token
