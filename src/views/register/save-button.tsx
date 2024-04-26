import { Button, FormInstance, Spin } from 'antd'
import { IAccountSignUpForm } from '@/views/register/register-content'
import { useEffect, useState } from 'react'
import { useWatch } from 'antd/es/form/Form'

interface ISaveCreateAccountButton {
    form: FormInstance<IAccountSignUpForm>
    isLoading: boolean
}

const SaveCreateAccountButton = ({
    form,
    isLoading,
}: ISaveCreateAccountButton) => {
    const [submittable, setSubmittable] = useState(false)
    // tracker all values in form, it will track every value inn form
    //[]: Mảng rỗng [] được truyền vào như là đối số đầu tiên cho useWatch, điều này có nghĩa là nó sẽ theo dõi tất cả các trường.
    //form: form là đối số thứ hai, nó là một instance của form mà bạn muốn theo dõi.
    // values sẽ là một đối tượng chứa giá trị hiện tại của tất cả các trường trong form. Mỗi khi có sự thay đổi trong form, values sẽ được cập nhật và component sẽ re-render.
    const values = useWatch([], form)
    /*
*
* form.validateFields({validateOnly: true}): Phương thức validateFields của đối tượng form được sử dụng để kiểm tra xem tất cả các trường trong form có hợp lệ hay không. validateOnly: true nghĩa là nó chỉ kiểm tra xem các trường có hợp lệ hay không mà không thay đổi trạng thái của form.
.then(() => { setSubmittable(true) }, () => { setSubmittable(false) }): Nếu tất cả các trường trong form hợp lệ, setSubmittable(true) sẽ được gọi, đặt trạng thái submittable thành true. Nếu có bất kỳ trường nào không hợp lệ, setSubmittable(false) sẽ được gọi, đặt trạng thái submittable thành false.
*
* */
    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true)
            },
            () => {
                setSubmittable(false)
            },
        )
    }, [values])
    return (
        <Spin spinning={isLoading} delay={0}>
            <Button
                type="default"
                className="bg-primary text-white transition-opacity disabled:opacity-60"
                size="large"
                htmlType="submit"
                disabled={!submittable}
            >
                {'Register'}
            </Button>
        </Spin>
    )
}

export default SaveCreateAccountButton
